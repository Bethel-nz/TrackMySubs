import { Oval } from 'react-loader-spinner';

export default function Spinner({ isLoading }: { isLoading: boolean }) {
  return (
    <Oval
      visible={isLoading}
      height='20'
      width='20'
      color='white'
      ariaLabel='oval-loading'
      strokeWidthSecondary={8}
      strokeWidth={6}
      secondaryColor='white'
    />
  );
}
