'use client'

import { navigationBackgroundColor, textColor } from '@/components/design/colors'
import { NavFooter } from '@/components/navigation/NavFooter'
import { NavHeader } from '@/components/navigation/NavHeader'
import { NavigationMenu } from '@/components/navigation/NavigationMenu'
import { withBasePath } from '@/lib/basePath'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, Layout } from 'antd'
import './globals.css'

const { Header, Content, Footer } = Layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={withBasePath('/logo128.png')} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#0BD89D',
              },
            }}
          >
            <Layout className='min-h-screen'>
              <Header style={{ backgroundColor: navigationBackgroundColor }}>
                <NavHeader />
              </Header>
              <Content style={{ color: textColor }}>
                <NavigationMenu className='block sm:hidden w-full' />
                <div className='container mx-auto py-8 px-4 sm:px-24'>
                  {children}
                </div>
              </Content>
              <Footer style={{ backgroundColor: navigationBackgroundColor }}>
                <NavFooter />
              </Footer>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
