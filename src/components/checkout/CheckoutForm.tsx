'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DeliverySlotPicker } from '@/components/checkout/DeliverySlotPicker';
import { OrderReview } from '@/components/checkout/OrderReview';
import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { useCart } from '@/hooks/useCart';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useDeliveryStore } from '@/store/deliveryStore';
import { buildOrder } from '@/domain/order';
import { orderChannel } from '@/services/orderChannel';
import { copy } from '@/content/copy';
import { storageSet } from '@/lib/storage';
import Link from 'next/link';
import { PincodeCard } from '@/components/delivery/PincodeCard';

const schema = z.object({
  name: z.string().trim().min(1, copy.checkout.nameRequired),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, copy.checkout.mobileInvalid),
  address: z.string().trim().min(10, copy.checkout.addressMin),
  landmark: z.string().trim().optional(),
  date: z.string().min(1, copy.checkout.slotRequired),
  timeSlot: z.string().min(1, copy.checkout.slotRequired),
  cakeMessage: z
    .string()
    .max(40, copy.checkout.cakeMessageMax)
    .optional(),
  notes: z.string().max(200, copy.checkout.notesMax).optional(),
});

type FormValues = z.infer<typeof schema>;

export function CheckoutForm() {
  const router = useRouter();
  const { lines, rawLines, subtotal, productsById } = useCart();
  const saved = useCheckoutStore((s) => s.saved);
  const setSaved = useCheckoutStore((s) => s.setSaved);
  const clearSaved = useCheckoutStore((s) => s.clearSaved);
  const delivery = useDeliveryStore((s) => s.result);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: saved.name,
      phone: saved.phone,
      address: saved.address,
      landmark: saved.landmark,
      date: '',
      timeSlot: '',
      cakeMessage: '',
      notes: '',
    },
  });

  const date = watch('date');
  const timeSlot = watch('timeSlot');
  const clearDelivery = useDeliveryStore((s) => s.clear);

  if (rawLines.length === 0) {
    return (
      <p>
        Your cart is empty.{' '}
        <Link href="/menu/" className="text-teal-800 underline">
          Browse the menu
        </Link>
      </p>
    );
  }

  if (!delivery) {
    return (
      <section className="mx-auto max-w-md space-y-4 rounded-[var(--radius-xl)] border border-icing-300/70 bg-cream-50 p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <h2 className="font-display text-2xl text-teal-900">
          Confirm delivery area
        </h2>
        <p className="text-cocoa-800/80">
          Almost done — enter your pincode so we can confirm delivery within
          10 km of Sector 46.
        </p>
        <PincodeCard autoFocus variant="checkout" />
      </section>
    );
  }

  const onSubmit = async (values: FormValues) => {
    setSaved({
      name: values.name,
      phone: values.phone,
      address: values.address,
      landmark: values.landmark ?? '',
    });

    const order = buildOrder({
      customer: { name: values.name, phone: values.phone },
      delivery: {
        address: values.address,
        pincode: delivery.pincode,
        landmark: values.landmark?.trim() || undefined,
        date: values.date,
        timeSlot: values.timeSlot,
      },
      lines: rawLines,
      productsById,
      cakeMessage: values.cakeMessage,
      notes: values.notes,
    });

    const result = await orderChannel.submit(order);
    if (!result.ok) return;

    storageSet(
      'mithaava-last-order',
      JSON.stringify({
        orderId: result.orderId,
        message: result.message,
        url: result.url,
        subtotal: order.subtotal,
      }),
    );

    router.push('/order-sent/');
  };

  return (
    <form
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-teal-900">
            {copy.checkout.yourDetails}
          </h2>
          <Input
            label={copy.checkout.fullName}
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label={copy.checkout.mobile}
            inputMode="tel"
            autoComplete="tel-national"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <button
            type="button"
            className="text-sm text-teal-800 underline-offset-2 hover:underline"
            onClick={() => {
              clearSaved();
              setValue('name', '');
              setValue('phone', '');
              setValue('address', '');
              setValue('landmark', '');
            }}
          >
            {copy.checkout.clearSaved}
          </button>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-teal-900">
            {copy.checkout.delivery}
          </h2>
          <Input
            label={copy.checkout.address}
            autoComplete="street-address"
            error={errors.address?.message}
            {...register('address')}
          />
          <Input
            label={copy.checkout.landmark}
            {...register('landmark')}
          />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">{copy.checkout.pincode}:</span>
            <span>{delivery.pincode}</span>
            <button
              type="button"
              className="text-teal-800 underline-offset-2 hover:underline"
              onClick={() => clearDelivery()}
            >
              {copy.pincode.change}
            </button>
          </div>
          <Controller
            control={control}
            name="date"
            render={() => (
              <DeliverySlotPicker
                leadTimes={lines.map((l) => l.product?.leadTimeHours)}
                date={date}
                timeSlot={timeSlot}
                onDateChange={(d) =>
                  setValue('date', d, { shouldValidate: true })
                }
                onSlotChange={(s) =>
                  setValue('timeSlot', s, { shouldValidate: true })
                }
                error={
                  errors.date?.message || errors.timeSlot?.message
                }
              />
            )}
          />
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-teal-900">
            {copy.checkout.cakeMessageAndNotes}
          </h2>
          <Input
            label={copy.checkout.cakeMessage}
            maxLength={40}
            error={errors.cakeMessage?.message}
            {...register('cakeMessage')}
          />
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">{copy.checkout.notes}</span>
            <textarea
              className="min-h-24 rounded-[var(--radius-md)] border border-icing-300/90 bg-cream-50 px-3 py-2 text-base"
              maxLength={200}
              {...register('notes')}
            />
            {errors.notes?.message ? (
              <span className="text-berry-600">{errors.notes.message}</span>
            ) : null}
          </label>
        </section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <OrderReview lines={lines} subtotal={subtotal} />
        <Button
          type="submit"
          variant="whatsapp"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          <WhatsAppIcon className="h-5 w-5" />
          {copy.checkout.sendWhatsApp}
        </Button>
        <AggregatorStrip />
      </aside>
    </form>
  );
}
