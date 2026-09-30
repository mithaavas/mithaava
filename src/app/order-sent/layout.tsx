import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order sent',
  description:
    'Your Mithaava cake order has been sent on WhatsApp. We will confirm your delivery slot, address and cake message in chat shortly.',
  alternates: { canonical: '/order-sent/' },
};

export default function OrderSentLayout({ children }: LayoutProps<'/order-sent'>) {
  return children;
}
