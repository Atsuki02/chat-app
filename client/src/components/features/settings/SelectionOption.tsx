import { CheckIcon } from '@radix-ui/react-icons';

const SelectionOption = ({
  onClick,
  label,
  isChecked,
}: {
  onClick: () => void;
  label: string;
  isChecked: boolean;
}) => {
  return (
    <div
      className="flex justify-between items-center w-full text-sm sm:py-2 py-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs">{label}</span>
      </div>
      {isChecked && (
        <div className="flex items-center">
          <div className="h-4 w-4 font text-blue-400">
            <CheckIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionOption;
