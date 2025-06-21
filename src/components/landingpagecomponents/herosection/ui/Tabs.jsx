import React, { useState, createContext, useContext } from "react"

// Create context to share active tab and setter
const TabsContext = createContext()

export function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue || null)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }) {
  return <div role="tablist" className={className}>{children}</div>
}

export function TabsTrigger({ value, children, className }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  const isActive = activeTab === value

  const handleClick = () => {
    setActiveTab(value)
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={handleClick}
      className={`${className} ${isActive ? "active" : ""}`}
      type="button"
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext)

  if (activeTab !== value) return null

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  )
}
