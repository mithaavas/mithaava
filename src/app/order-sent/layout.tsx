import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order sent',
  alternates: { canonical: '/order-sent/' },
};

export default function OrderSentLayout({ children }: LayoutProps<'/order-sent'>) {
  return children;
}
