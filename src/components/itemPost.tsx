interface propsCard {
  className: string;
  userId: number;
  id?: number;
  title: string;
}

function ItemPost({ className, userId, id, title }: propsCard) {
  return (
    <div className={className}>
      <h2 className="font-bold">Operador: {userId}</h2>
      <h3>Assunto: {title}</h3>
    </div>
  );
}

export default ItemPost;
