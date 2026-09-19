'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { whatsappConfig } from '@/config/whatsapp';
import { siteConfig } from '@/config/site';
import { copy } from '@/content/copy';
import {
  buildContactWhatsAppMessage,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';
import { cn } from '@/lib/cn';

const schema = z.object({
  name: z.string().trim().min(1, copy.contact.nameRequired),
  address: z.string().trim().min(10, copy.contact.addressMin),
  message: z
    .string()
    .trim()
    .min(10, copy.contact.messageMin)
    .max(500, copy.contact.messageMax),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      address: '',
      message: '',
    },
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => {
        const text = buildContactWhatsAppMessage(values);
        const url = buildWhatsAppUrl(whatsappConfig.number, text);
        window.open(url, '_blank', 'noopener,noreferrer');
      })}
      noValidate
    >
      <Input
        label={copy.contact.name}
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />
      <label className="flex w-full flex-col gap-1.5 text-sm">
        <span className="font-medium text-cocoa-800">{copy.contact.address}</span>
        <textarea
          rows={3}
          autoComplete="street-address"
          className={cn(
            'w-full resize-y rounded-[var(--radius-md)] border bg-cream-50 px-3 py-3 text-base text-cocoa-800 placeholder:text-cocoa-800/40',
            errors.address
              ? 'border-berry-600 focus-visible:outline-berry-600'
              : 'border-icing-300/90 focus-visible:outline-teal-700',
          )}
          aria-invalid={Boolean(errors.address)}
          {...register('address')}
        />
        {errors.address ? (
          <span className="text-sm text-berry-600">{errors.address.message}</span>
        ) : null}
      </label>
      <label className="flex w-full flex-col gap-1.5 text-sm">
        <span className="font-medium text-cocoa-800">{copy.contact.message}</span>
        <textarea
          rows={5}
          placeholder={copy.contact.messagePlaceholder}
          className={cn(
            'w-full resize-y rounded-[var(--radius-md)] border bg-cream-50 px-3 py-3 text-base text-cocoa-800 placeholder:text-cocoa-800/40',
            errors.message
              ? 'border-berry-600 focus-visible:outline-berry-600'
              : 'border-icing-300/90 focus-visible:outline-teal-700',
          )}
          aria-invalid={Boolean(errors.message)}
          {...register('message')}
        />
        {errors.message ? (
          <span className="text-sm text-berry-600">{errors.message.message}</span>
        ) : null}
      </label>

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        className="w-full gap-2"
        loading={isSubmitting}
      >
        <WhatsAppIcon className="h-5 w-5" />
        {copy.contact.sendWhatsApp}
      </Button>

      <p className="text-center text-sm text-cocoa-800/60">
        {copy.contact.visitHint}
        <br />
        WhatsApp {siteConfig.contact.whatsappDisplay}
      </p>

      <AggregatorStrip className="justify-center" />
    </form>
  );
}
