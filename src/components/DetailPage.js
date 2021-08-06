  
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  return <div>Single Post: {id}</div>;
};

export default DetailPage;