import  { useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useGuideStore } from '../store/guideStore';


const steps: Step[] = [
  {
    target: '.dashboard-overview',
    content: 'Welcome to your staking dashboard! Here you can monitor your total staked amount, active positions, and daily rewards at a glance.',
    disableBeacon: true,
    placement: 'bottom',
    styles: {
      tooltipContainer: {
        textAlign: 'left'
      }
    }
  },
  {
    target: '.staking-plans',
    content: 'Choose from our diverse staking plans. Each plan offers unique features and yields tailored to different investment goals. Hover over each plan to learn more about its specific benefits.',
    placement: 'top'
  },
  {
    target: '.analytics-section',
    content: 'Track your performance with detailed analytics. View historical data, ROI metrics, and projected earnings to make informed decisions.',
    placement: 'bottom'
  },
  {
    target: '.yield-calculator',
    content: 'Use our advanced yield calculator to estimate potential earnings. Adjust stake amount, duration, and compounding options to plan your investment strategy.',
    placement: 'top'
  },
  {
    target: '.referral-section',
    content: 'Boost your earnings through our referral program. Share your unique code and earn a percentage of your referrals\' rewards.',
    placement: 'bottom'
  },
  {
    target: '.transaction-history',
    content: 'Keep track of all your transactions, including deposits, withdrawals, and earned rewards. Filter and export data for your records.',
    placement: 'top'
  },
  {
    target: '.leaderboard-section',
    content: 'Compete with other stakers and earn additional rewards. Reach top positions to unlock exclusive benefits and higher yields.',
    placement: 'bottom'
  }
];

const styles = {
  options: {
    arrowColor: '#1e293b',
    backgroundColor: '#1e293b',
    overlayColor: 'rgba(0, 0, 0, 0.85)',
    primaryColor: '#3b82f6',
    textColor: '#fff',
    width: 350,
    zIndex: 1000,
    beaconSize: 36
  },
  tooltipContent: {
    padding: '20px',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  tooltipFooter: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonNext: {
    backgroundColor: '#3b82f6',
    padding: '8px 16px',
    borderRadius: '8px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  buttonBack: {
    backgroundColor: 'transparent',
    padding: '8px 16px',
    borderRadius: '8px',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    marginRight: '8px'
  },
  buttonSkip: {
    backgroundColor: 'transparent',
    padding: '8px 16px',
    color: '#94a3b8',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export function DashboardGuide() {
  // const { t } = useTranslation();
  const { isGuideActive, setGuideActive, hasSeenGuide, setHasSeenGuide, currentStep, setCurrentStep } = useGuideStore();

  useEffect(() => {
    // Show guide after a short delay for better UX
    if (!hasSeenGuide) {
      const timer = setTimeout(() => {
        setGuideActive(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenGuide, setGuideActive]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (action === 'update') {
      setCurrentStep(index);
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as 'finished' | 'skipped')) {
      setGuideActive(false);
      setHasSeenGuide(true);
      setCurrentStep(0);
    }

    // Handle step transitions
    if (type === 'step:after') {
      // Update current step
      setCurrentStep(index + 1);

      // Add any custom logic for specific steps
      if (index === 1) {
        // Example: Highlight staking plans
        const plans = document.querySelector('.staking-plans');
        if (plans) {
          plans.classList.add('highlight-section');
          setTimeout(() => plans.classList.remove('highlight-section'), 1000);
        }
      }
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={isGuideActive}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={styles}
      disableOverlayClose
      spotlightPadding={8}
      stepIndex={currentStep}
      floaterProps={{
        disableAnimation: true
      }}
    />
  );
}