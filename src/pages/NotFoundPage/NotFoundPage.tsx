import { CustomButton } from '@alfalab/core-components/custom-button';
import { Typography } from '@alfalab/core-components/typography';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <Typography.Title tag="h1">404</Typography.Title>

      <CustomButton
        size="m"
        onClick={() => navigate('/')}
        stateType="lightening"
        contentColor="white"
        backgroundColor="linear-gradient(264deg, #FF42CA 0%, #FF8A00 100%)"
      >
        На главную
      </CustomButton>
    </div>
  );
}
