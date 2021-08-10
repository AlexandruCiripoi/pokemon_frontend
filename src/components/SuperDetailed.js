  
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const { info } = useParams();
  console.log("works")
  return <div>Single Post: {id} {info}</div>;
};

export default DetailPage;