import React from 'react'
import Assets from '@/assets/Assets'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Header() {
  // Get the current location from react-router-dom
  const location = useLocation()

  // Define a mapping of custom names for non-homepage routes
  const customRouteNames = {
    '/notifications': 'Notifications',
    '/messages': 'Messages',
    '/search': 'Find',
    '/communities': 'Communities',
    '/profile': 'Profile',
    '/mydrafts': 'My Drafts',
    '/mydiscussions': 'My Discussions',
    '/portfolio': 'Portfolio',
    '/addcreationpost': 'Add Creation',
    '/addportfoliopost': 'Add Project',
    '/addcommunitypost': 'Add Discussion',
    '/communitytopicpage': 'General',
    '/login': "Xongroh",
    '/register': "Xongroh",
    // Add custom names for other routes
  }

  // Function to render the appropriate content based on the route
  const renderContent = () => {
    // Check if the current route is the homepage ("/")
    if (location.pathname === '/') {
      return (
        <>
          <div className="flex items-center justify-between px-4 py-3 lg:hidden">
            <div className="flex items-center space-x-4">
              <div>
                {/* <img className="h-10 w-10" src={Assets.xongroh} alt="xongroh" /> */}
                
              </div>
              <div>
                <h1 className="text-2xl font-bold">xongroh</h1>
              </div>
            </div>

            <div className="flex flex-row space-x-6">
              <Link to="/notifications">
                <img className="h-8 w-8" src={Assets.notification} alt="notification" />
              </Link>
              <Link to="/messages">
                <img className="h-8 w-8" src={Assets.chat} alt="chat" />
              </Link>
            </div>
          </div>

        
        </>
      )
    } else {
      // If the route is not the homepage, check if it has a custom name
      if (customRouteNames[location.pathname]) {
        return (
          <>
            {' '}
            <div className="py-4 pl-4 xl:pt-10">
              <div className="flex items-center text-xl font-bold">
                <div className="pr-1">
                  <Link to="/">
                    <Button className="p-0" variant="link">
                      <img src={Assets.back} alt="" />
                    </Button>
                  </Link>
                </div>
                <div className="pl-2 text-2xl font-bold">
                  {customRouteNames[location.pathname]}
                </div>
              </div>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className="py-4">
              <Link to="/">
                <Button
                  className="text-md font-semibold text-secondary-foreground"
                  variant="link"
                >Back
                  {/* <img src={Assets.back} alt="" className="h-5 pr-1" /> Back */}
                </Button>
              </Link>
            </div>
          </>
        )
      }
    }
  }

  return (
    <header>
      <div className="bg-secondary">
        <div>{renderContent()}</div>
      </div>
    </header>
  )
}

export default Header