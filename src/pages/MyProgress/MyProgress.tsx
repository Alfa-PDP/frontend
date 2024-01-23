import { useParams } from 'react-router-dom';

export default function MyProgress() {
  const { userId } = useParams();

  return <div>Индивидуальный план развития {userId}</div>;
}
