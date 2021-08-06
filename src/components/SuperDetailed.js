  
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const { info } = useParams();
  return <div>Single Post: {id} {info}</div>;
};

export default DetailPage;