import { useGetOrder } from '../../../../hooks/useOrder';
import styles from './OrderPage.module.scss';

export function OrderPage() {
  const { data: orders } = useGetOrder();

  // Преобразуем заказы в одну строку на каждый продукт
  const rows = orders?.flatMap((order) =>
    order.products.map((product) => ({
      createdAt: new Date(order.created_at).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      orderNumber: order.order_number,
      title: product.title,
      price:
        Number(product?.price).toLocaleString('ru-RU').replace(/,/g, ' ') +
        " so'm",
      image: product.image,
    }))
  );

  return (
    <div className={styles.order_page}>
      <div className={styles.header}>
        <div>Дата/Время</div>
        <div>№ Заказа</div>
        <div>Товар</div>
        <div>Сумма</div>
      </div>

      {rows?.map((row, index) => (
        <div className={styles.row} key={index}>
          <div>{row.createdAt}</div>
          <div>№{row.orderNumber}</div>
          <div className={styles.product}>
            <img src={row.image} alt={row.title} />
            <span>{row.title}</span>
          </div>
          <div>{row.price}</div>
        </div>
      ))}
    </div>
  );
}
