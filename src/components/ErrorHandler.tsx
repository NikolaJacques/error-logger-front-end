import {ErrorBoundary, FallbackProps} from 'react-error-boundary'
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  return (
    <Box>
      <Typography component="p">Something went wrong:</Typography>
      <Typography component="pre">{error?.message}</Typography>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Box>
  )
}

interface Props {
  children: React.ReactNode;
}

export default function ErrorHandler(props: Props){
    return (
      <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // use to reset app state
          }}
      >
        {props.children}
      </ErrorBoundary>
    )
}