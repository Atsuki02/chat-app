import { ReloadIcon } from '@radix-ui/react-icons';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
      <ReloadIcon
        className="animate-spin text-yellow-300"
        style={{ width: '50px', height: '50px' }}
      />
    </div>
  );
};

export default Loading;
