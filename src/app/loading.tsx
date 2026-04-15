import { FadeLoader } from 'react-spinners';

export default function loading() {
  return (
    <div className="flex justify-center h-screen items-center text-2xl font-bold text-green-600">
      <FadeLoader color='green'/>
    </div>
  );
}