/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput,parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { createSystem } from 'frog/ui'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

const { Image, Row, Rows, Text } = createSystem()

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
        </div> */}
        {/* <img src="/chili-crab.png"  alt="Chili Crab" style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}/> */}
        <Image src="/chili-crab.png"/>
        <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '50px',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >

        <Text>Chilli Crab Offer</Text>
      </div>
  
      </div>
    ),
    intents: [
      <Button value="buy">Buy</Button>,
      <Button value="withdraw">Withdraw</Button>,
      <Button.Transaction
      target="/send-ether"
    >
      Send Eth
    </Button.Transaction>,
      // <Button.Link href={`/api/details`}>Google</Button.Link>,

      // status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.transaction('/send-ether', (c) => {
  return c.send({
  chainId: 'eip155:10',
  to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  value: parseEther('0.0001'),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
