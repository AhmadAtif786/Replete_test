import { ChainId } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ChainAvailabilityText } from 'src/components/ChainAvailabilityText';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import { useRootStore } from 'src/store/root';
import { GENERAL } from 'src/utils/mixPanelEvents';

import { Link } from '../../components/primitives/Link';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { TitleWithSearchBar } from 'src/components/TitleWithSearchBar';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { getGhoReserve } from 'src/utils/ghoUtilities';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';

interface StakingHeaderProps {
  tvl?: string;
  stkEmission?: string;
  loading?: boolean;
}

export const AppAssets: React.FC<StakingHeaderProps> = () => {
  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const { reserves } = useAppDataContext();


  const filteredData = reserves;
  ;
  return (
    <TopInfoPanel titleComponent={<></>}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Box mb={4}>
            {/* <ChainAvailabilityText wrapperSx={{ mb: 4 }} chainId={ChainId.mainnet} /> */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Typography variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}>
                <Trans>Your Assets</Trans>
              </Typography>
            </Box>
<Box sx={{display:'flex'}}>
<Typography
              sx={{
                color: 'rgba(243, 243, 243, 0.80)',
                maxWidth: '824px',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              <Trans>Compatible assets across your wallet.</Trans>{' '}
            </Typography>
            <TitleWithSearchBar
              onSearchTermChange={''}
              title={
                <></>
              }
              searchPlaceholder={'Search tickers or assets name'}
            />
</Box>
            
          </Box>
          <Box
            sx={{
              background:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)), linear-gradient(0deg, #080808, #080808)',
              borderRadius: '20px',
            }}
          >
            <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', p: 2, width: '100%' }}>
              <Box sx={{ backgroundColor: 'rgba(19, 19, 19, 1)', borderRadius: '20px', p: 2 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                          sx={{
                            color: 'rgba(119, 119, 119, 1)',

                            fontSize: '14px',
                            fontWeight: '400',
                            mr:1
                          }}
                        >
                          <Trans>Your balance</Trans>{' '}
                        </Typography>
                        <Box sx={{display:'flex'}}>
                          {["MKR", "crvUSD", "STG", ,"1INCH"].map((item) => (
                            
                            <TokenIcon symbol={item} sx={{ fontSize: '15px' }} />
                          ))}
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant={'h4'}>
                          <span className="grey-text">$</span> <Trans>1,102.00</Trans>
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{
                            color: 'rgba(119, 119, 119, 1)',
                            fontSize: '14px',
                            fontWeight: '400',
                          }}
                        >
                          <Trans>Net APY</Trans>
                        </Typography>
                        <Box>
                          <Typography variant={'h4'}>
                            <span className="grey-text"> {'<'}</span> <Trans>0.0</Trans>
                            <span>%</span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                          sx={{
                            color: 'rgba(119, 119, 119, 1)',

                            fontSize: '14px',
                            fontWeight: '400',
                            mr:1
                          }}
                        >
                          <Trans>Your balance</Trans>{' '}
                        </Typography>
                        <Box sx={{display:'flex'}}>
                          {["MKR", "crvUSD", "STG", ].map((item) => (
                            
                            <TokenIcon symbol={item} sx={{ fontSize: '15px' }} />
                          ))}
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant={'h4'}>
                          <span className="grey-text">$</span> <Trans>1,102.00</Trans>
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{
                            color: 'rgba(119, 119, 119, 1)',

                            fontSize: '14px',
                            fontWeight: '400',
                          }}
                        >
                          <Trans> Health factor</Trans>
                        </Typography>
                        <Box>
                          <Typography variant={'h4'} sx={{ color: 'rgba(69, 139, 84, 1)' }}>
                            <Trans>&#8734;</Trans>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                          sx={{
                            color: 'rgba(119, 119, 119, 1)',

                            fontSize: '14px',
                            fontWeight: '400',
                            mr:1
                          }}
                        >
                          <Trans>Your balance</Trans>{' '}
                        </Typography>
                        <Box sx={{display:'flex'}}>
                          {[, "crvUSD", ].map((item) => (
                            
                            <TokenIcon symbol={item} sx={{ fontSize: '15px' }} />
                          ))}
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant={'h4'}>
                          <span className="grey-text">$</span> <Trans>1,102.00</Trans>
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{
                            color: 'rgba(119, 119, 119, 1)',

                            fontSize: '14px',
                            fontWeight: '400',
                          }}
                        >
                          <Trans>Borrow power used</Trans>
                        </Typography>
                        <Box>
                          <Typography variant={'h4'}>
                            <span className="grey-text">$</span> <Trans>0.0</Trans>
                            <span>%</span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {filteredData.map((item) => {
              return (
                <>
                  <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', p: 2, width: '100%' }}>
                    <Box
                      sx={{ backgroundColor: 'rgba(19, 19, 19, 1)', borderRadius: '20px', p: 2 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between ',
                          p: 4,
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ display: 'flex' }}>
                          <TokenIcon symbol={item?.symbol} sx={{ fontSize: '25px' }} />

                          <Typography
                            sx={{
                              fontSize: '15px',
                              fontWeight: '400',
                              ml: 2,
                            }}
                          >
                            <Trans>{item?.name}</Trans>
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <Typography
                            sx={{
                              fontSize: '10px',
                              fontWeight: '400',
                              mr: 5,
                            }}
                          >
                            <Trans>98%</Trans>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '10px',
                              fontWeight: '400',
                              
                            }}
                          >
                            <span>$</span> <Trans>1,102.00</Trans>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '15px',
                              fontWeight: '400',
                              mr: 3,
                              ml:5

                            }}
                          >
                            <Trans>{item?.active ? 'Hide' : 'Show'}</Trans>
                          </Typography>
                          {/* <img
                      src="/minus-icon.png"
                      height={'4px'}
                      width={'20px'}
                      className="cursor-pointer"
                      style={{ marginTop: '9px' }}
                    /> */}
                          <Typography
                            sx={{
                              fontSize: '15px',
                              fontWeight: '400',
                              mr: 3,
                            }}
                          >
                            <b>{item?.active ? <Trans>&#8722;</Trans> : <Trans>&#43;</Trans>}</b>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} md={6} xl={6}>
          <Box mb={4}>
            {/* <ChainAvailabilityText wrapperSx={{ mb: 4 }} chainId={ChainId.mainnet} /> */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Typography variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}>
                <Trans>Liquidity application</Trans>
              </Typography>
            </Box>

            <Typography
              sx={{
                color: 'rgba(243, 243, 243, 0.80)',
                maxWidth: '824px',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              <Trans>Chain abstracted supply and borrow.</Trans>{' '}
            </Typography>
          </Box>
          <Box
            sx={{
              background:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)), linear-gradient(0deg, #080808, #080808)',
              borderRadius: '20px',
            }}
          >
            <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', p: 2, width: '100%' }}>
              <Box sx={{ backgroundColor: 'rgba(19, 19, 19, 1)', borderRadius: '20px', p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    component={Link}
                    href={'/'}
                    className="app-page-btn app-page-btn-active"
                  >
                    <Trans>Supply</Trans>
                  </Button>
                  <Button variant="outlined" component={Link} href={'/'} className="app-page-btn"
                  sx={{

                    '&:hover': {
                      backgroundColor: 'rgb(243 239 239)', // Change this to the desired hover color
                    },
                  }}
                  >
                    <Trans>Borrow</Trans>
                  </Button>{' '}
                  <Button variant="outlined" component={Link} href={'/'} className="app-page-btn"
                   sx={{

                    '&:hover': {
                      backgroundColor: 'rgb(243 239 239)', // Change this to the desired hover color
                    },
                  }}
                  >
                    <Trans>Repay</Trans>
                  </Button>{' '}
                  <Button variant="outlined" component={Link} href={'/'} className="app-page-btn"
                   sx={{

                    '&:hover': {
                      backgroundColor: 'rgb(243 239 239)', // Change this to the desired hover color
                    },
                  }}
                  >
                    <Trans>Withdraw</Trans>
                  </Button>
                  <Box>
                    <img
                      src="/icons/tokens/1inch.svg"
                      alt="avatar"
                      height={'20px'}
                      width={'20px'}
                      style={{ marginRight: '-2px' }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>{' '}
            <Box sx={{ p: 2, width: '100%' }}>
              <Box sx={{ backgroundColor: 'rgba(19, 19, 19, 1)', borderRadius: '20px', p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between ',
                    p: 4,
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ mt: 2 }}>
                      <img
                        src="/icons/tokens/1inch.svg"
                        alt="avatar"
                        height={'20px'}
                        width={'20px'}
                      />
                    </Box>

                    <Box sx={{ ml: 2 }}>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                        className="grey-text"
                      >
                        <Trans>From</Trans>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: '400',
                        }}
                      >
                        <Trans>Arbitrum &#11206;</Trans>
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        border: '1px solid',
                        background: 'rgba(243, 243, 243, 1)',
                        mt: 1,
                        mr: 2,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '10px',
                        fontWeight: '400',
                      }}
                    >
                      <Trans>Connected</Trans>
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ border: '1px solid rgba(235, 235, 239, 0.08)', borderRadius: '20px', p: 2 }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box>
                        <Button
                          variant="outlined"
                          component={Link}
                          href={'/'}
                          className="app-page-btn "
                        >
                          <Trans>Supply &#11206;</Trans>
                        </Button>
                      </Box>
                      <Box sx={{ ml: 2 }}>
                        <Typography
                          sx={{
                            fontSize: '15px',
                            fontWeight: '400',
                          }}
                        >
                          <Trans>0.0000</Trans>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '10px',
                          }}
                        >
                          <Trans>0.0</Trans>
                          <span className="grey-text"> available</span>
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                        className="grey-text"
                      >
                        <Trans>$0.0k</Trans>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ borderRadius: '20px', p: 2 }}>
              <Box sx={{ p: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <VariableAPYTooltip
                      text={
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                          className="grey-text"
                        >
                          <Trans>Supply APY</Trans>
                        </Typography>
                      }
                      key="APY_list_variable_type"
                      variant="subheader2"
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '400',
                        mr: 5,
                      }}
                    >
                      <Trans>98</Trans>
                      <span className="grey-text">%</span>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <VariableAPYTooltip
                      text={
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                          className="grey-text"
                        >
                          <Trans>Net APY</Trans>
                        </Typography>
                      }
                      key="APY_list_variable_type"
                      variant="subheader2"
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '400',
                        mr: 5,
                        color: 'rgba(69, 139, 84, 1)',
                      }}
                    >
                      <Trans>+1.06%</Trans>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <VariableAPYTooltip
                      text={
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                          className="grey-text"
                        >
                          <Trans>Collateralization</Trans>
                        </Typography>
                      }
                      key="APY_list_variable_type"
                      variant="subheader2"
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '400',
                        mr: 5,
                        color: 'rgba(69, 139, 84, 1)',
                      }}
                    >
                      <Trans>Enabled</Trans>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <VariableAPYTooltip
                      text={
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                          className="grey-text"
                        >
                          <Trans>Health factor</Trans>
                        </Typography>
                      }
                      key="APY_list_variable_type"
                      variant="subheader2"
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '400',
                        mr: 5,
                      }}
                    >
                      <Typography variant={'h4'} sx={{ color: 'rgba(69, 139, 84, 1)' }}>
                        <Trans>&#8734;</Trans>
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ borderRadius: '20px', p: 2 }}>
              <Button variant="outlined" component={Link} href={'/'} fullWidth
              sx={{

                '&:hover': {
                  backgroundColor: 'rgb(243 239 239)', // Change this to the desired hover color
                },
              }}
              >
                <Trans>Supply</Trans>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </TopInfoPanel>
  );
};
