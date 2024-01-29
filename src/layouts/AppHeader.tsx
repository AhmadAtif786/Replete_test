import { InformationCircleIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import {
  Badge,
  Button,
  NoSsr,
  Slide,
  styled,
  SvgIcon,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ContentWithTooltip } from 'src/components/ContentWithTooltip';
import { useModalContext } from 'src/hooks/useModal';
import { useRootStore } from 'src/store/root';
import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

import { Link } from '../components/primitives/Link';
import { uiConfig } from '../uiConfig';
import { NavItems } from './components/NavItems';
import { MobileMenu } from './MobileMenu';
import { SettingsMenu } from './SettingsMenu';
import WalletWidget from './WalletWidget';

interface Props {
  children: React.ReactElement;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: '2px',
    right: '2px',
    borderRadius: '20px',
    width: '10px',
    height: '10px',
    backgroundColor: `${theme.palette.secondary.main}`,
    color: `${theme.palette.secondary.main}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function HideOnScroll({ children }: Props) {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const trigger = useScrollTrigger({ threshold: md ? 160 : 80 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const SWITCH_VISITED_KEY = 'switchVisited';

export function AppHeader() {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const sm = useMediaQuery(breakpoints.down('sm'));

  const [visitedSwitch, setVisitedSwitch] = useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(localStorage.getItem(SWITCH_VISITED_KEY));
  });

  const [mobileDrawerOpen, setMobileDrawerOpen] = useRootStore((state) => [
    state.mobileDrawerOpen,
    state.setMobileDrawerOpen,
  ]);

  const { openSwitch } = useModalContext();

  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileDrawerOpen && !md) {
      setMobileDrawerOpen(false);
    }
    if (walletWidgetOpen) {
      setWalletWidgetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const headerHeight = 48;

  const toggleWalletWigit = (state: boolean) => {
    if (md) setMobileDrawerOpen(state);
    setWalletWidgetOpen(state);
  };

  const toggleMobileMenu = (state: boolean) => {
    if (md) setMobileDrawerOpen(state);
    setMobileMenuOpen(state);
  };

  const disableTestnet = () => {
    localStorage.setItem('testnetsEnabled', 'false');
    // Set window.location to trigger a page reload when navigating to the the dashboard
    window.location.href = '/app';
  };

  const handleSwitchClick = () => {
    localStorage.setItem(SWITCH_VISITED_KEY, 'true');
    setVisitedSwitch(true);
    openSwitch();
  };

  const testnetTooltip = (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1 }}>
      <Typography variant="subheader1">
        <Trans>Testnet mode is ON</Trans>
      </Typography>
      <Typography variant="description">
        <Trans>The app is running in testnet mode. Learn how it works in</Trans>{' '}
        <Link
          href="https://docs.aave.com/faq/testing-aave"
          style={{ fontSize: '14px', fontWeight: 400, textDecoration: 'underline' }}
        >
          FAQ.
        </Link>
      </Typography>
      <Button variant="outlined" sx={{ mt: '12px' }} onClick={disableTestnet}>
        <Trans>Disable testnet</Trans>
      </Button>
    </Box>
  );

  return (
    <HideOnScroll>
      <Box
        component="header"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sx={(theme) => ({
          height: headerHeight,
          position: 'sticky',
          top: 0,
          transition: theme.transitions.create('top'),
          zIndex: theme.zIndex.appBar,
          bgcolor: '#000000',
          padding: {
            xs: mobileMenuOpen || walletWidgetOpen ? '8px 20px' : '8px 8px 8px 20px',
            xsm: '8px 20px',
          },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'space-between',
          boxShadow: 'inset 0px -1px 0px rgba(242, 243, 247, 0.16)',
        })}
      >
        <Box
          component={Link}
          href="/"
          aria-label="Go to homepage"
          sx={{
            lineHeight: 0,
            mr: 3,
            transition: '0.3s ease all',
            '&:hover': { opacity: 0.7 },
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <img src={uiConfig.appLogo} alt="AAVE" width={72} height={20} />
        </Box>
        <Box sx={{ mr: sm ? 1 : 3 }}>
          {ENABLE_TESTNET && (
            <ContentWithTooltip tooltipContent={testnetTooltip} offset={[0, -4]} withoutHover>
              <Button
                variant="surface"
                size="small"
                color="primary"
                sx={{
                  backgroundColor: '#B6509E',
                  '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(182, 80, 158, 0.7)' },
                }}
              >
                TESTNET
                <SvgIcon sx={{ marginLeft: '2px', fontSize: '16px' }}>
                  <InformationCircleIcon />
                </SvgIcon>
              </Button>
            </ContentWithTooltip>
          )}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <NavItems />
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <NoSsr>
          {/* <StyledBadge
            invisible={visitedSwitch}
            variant="dot"
            badgeContent=""
            color="secondary"
            sx={{ mr: 2 }}
          > */}
            <Button
              onClick={handleSwitchClick}
              variant="surface"
              sx={{ p: '7px 8px', minWidth: 'unset', gap: 2, alignItems: 'center' ,mr:2}}
              aria-label="Switch tool"
            >
              {!md && (
                <Typography component="span" typography="subheader1">
                 0.100 ETH
                </Typography>
              )}
              <SvgIcon fontSize="small">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_312_1327)">
    <mask id="mask0_312_1327"  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
      <path d="M20 0H0V20H20V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_312_1327)">
      <mask id="mask1_312_1327"  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <path d="M20 0H0V20H20V0Z" fill="white"/>
      </mask>
      <g mask="url(#mask1_312_1327)">
        <path d="M20 10C20 15.5219 15.5219 20 10 20C4.47813 20 0 15.5219 0 10C0 4.47813 4.47813 0 10 0C15.5219 0 20 4.47813 20 10Z" fill="#213147"/>
      </g>
      <mask id="mask2_312_1327"  maskUnits="userSpaceOnUse" x="3" y="2" width="14" height="16">
        <path d="M16.6187 2.53436H3.38123V17.4687H16.6187V2.53436Z" fill="white"/>
      </mask>
      <g mask="url(#mask2_312_1327)">
        <path d="M3.88435 7.07186V12.925C3.88435 13.3 4.08435 13.6437 4.40623 13.8312L9.47498 16.7594C9.79998 16.9469 10.1968 16.9469 10.5219 16.7594L15.5906 13.8312C15.9156 13.6437 16.1125 13.3 16.1125 12.925V7.07186C16.1125 6.69686 15.9125 6.35311 15.5906 6.16561L10.5219 3.23749C10.1968 3.04999 9.79998 3.04999 9.47498 3.23749L4.4031 6.16561C4.0781 6.35311 3.88123 6.69686 3.88123 7.07186" fill="#213147"/>
        <path d="M11.1062 11.1343L10.3844 13.1156C10.3656 13.1718 10.3656 13.2312 10.3844 13.2875L11.6281 16.7L13.0656 15.8687L11.3375 11.1343C11.2969 11.025 11.1437 11.025 11.1062 11.1343Z" fill="#12AAFF"/>
        <path d="M12.5562 7.79999C12.5156 7.69061 12.3625 7.69061 12.325 7.79999L11.6031 9.78124C11.5844 9.83749 11.5844 9.89686 11.6031 9.95311L13.6406 15.5375L15.0781 14.7062L12.5562 7.79686V7.79999Z" fill="#12AAFF"/>
        <path d="M9.99996 3.45935C10.0343 3.45935 10.0718 3.46873 10.1031 3.48748L15.5906 6.65623C15.6531 6.69373 15.6937 6.76248 15.6937 6.83435V13.1687C15.6937 13.2437 15.6531 13.3094 15.5906 13.3469L10.1031 16.5156C10.0718 16.5344 10.0343 16.5437 9.99996 16.5437C9.96559 16.5437 9.92809 16.5344 9.89684 16.5156L4.40934 13.35C4.34684 13.3125 4.30621 13.2437 4.30621 13.1719V6.83748C4.30621 6.76248 4.34684 6.69685 4.40934 6.65935L9.89684 3.4906C9.92809 3.47185 9.96559 3.46248 9.99996 3.46248M9.99996 2.53748C9.80621 2.53748 9.60934 2.58748 9.43434 2.6906L3.94996 5.85623C3.59996 6.05935 3.38434 6.43123 3.38434 6.83748V13.1719C3.38434 13.575 3.59996 13.95 3.94996 14.1531L9.43746 17.3219C9.61246 17.4219 9.80621 17.475 10.0031 17.475C10.2 17.475 10.3937 17.425 10.5687 17.3219L16.0562 14.1531C16.4062 13.95 16.6218 13.5781 16.6218 13.1719V6.83748C16.6218 6.43435 16.4062 6.05935 16.0562 5.85623L10.5687 2.6906C10.3937 2.58748 10.1968 2.53748 10.0031 2.53748" fill="#9DCCED"/>
        <path d="M6.36871 15.5468L6.87496 14.1656L7.89059 15.0093L6.94059 15.875L6.36871 15.5468Z" fill="#213147"/>
        <path d="M9.53745 6.37811H8.14683C8.0437 6.37811 7.94995 6.44374 7.91558 6.54061L4.93433 14.7156L6.37183 15.5469L9.6562 6.54686C9.68745 6.46561 9.62808 6.38124 9.54058 6.38124" fill="#F3F3F3"/>
        <path d="M11.9718 6.37811H10.5812C10.4781 6.37811 10.3843 6.44374 10.35 6.54061L6.94684 15.875L8.38434 16.7062L12.0906 6.54686C12.1187 6.46561 12.0593 6.38124 11.975 6.38124" fill="#F3F3F3"/>
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_312_1327">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
              </SvgIcon>
            </Button>
          {/* </StyledBadge> */}
        </NoSsr>

        {!mobileMenuOpen && (
          <WalletWidget
            open={walletWidgetOpen}
            setOpen={toggleWalletWigit}
            headerHeight={headerHeight}
          />
        )}

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SettingsMenu />
        </Box>

        {!walletWidgetOpen && (
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileMenu
              open={mobileMenuOpen}
              setOpen={toggleMobileMenu}
              headerHeight={headerHeight}
            />
          </Box>
        )}
      </Box>
    </HideOnScroll>
  );
}
