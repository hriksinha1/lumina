'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  CircleHelp,
  Home,
  LineChart,
  ListFilter,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Star,
  TrendingUp,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react'

type Tab = 'Home' | 'Markets' | 'Portfolio' | 'Orders' | 'Profile'

const watchlist = [
  { name: 'Reliance Industries', ticker: 'RELIANCE', price: '₹1,482.50', change: '+1.26%', amount: '+₹18.40', up: true },
  { name: 'HDFC Bank', ticker: 'HDFCBANK', price: '₹1,756.80', change: '+0.84%', amount: '+₹14.60', up: true },
  { name: 'Tata Motors', ticker: 'TATAMOTORS', price: '₹982.15', change: '-0.42%', amount: '-₹4.15', up: false },
]

const orders = [
  { name: 'Infosys', ticker: 'INFY', side: 'Buy', qty: '12 shares', price: '₹1,464.20', status: 'Completed', date: 'Today, 10:42 AM' },
  { name: 'Tata Motors', ticker: 'TATAMOTORS', side: 'Sell', qty: '8 shares', price: '₹986.00', status: 'Open', date: 'Yesterday, 3:18 PM' },
  { name: 'HDFC Bank', ticker: 'HDFCBANK', side: 'Buy', qty: '5 shares', price: '₹1,741.50', status: 'Completed', date: '12 Jun, 11:06 AM' },
]

function BrandMark() {
  return <div className="brand-mark" aria-label="Citron home"><span>c</span></div>
}

function MiniChart({ muted = false }: { muted?: boolean }) {
  return (
    <svg className="mini-chart" viewBox="0 0 160 52" role="img" aria-label="Upward price chart">
      <path d="M0 42 C15 40 20 33 31 36 S45 24 57 29 S70 16 83 22 S100 18 112 19 S128 8 141 13 S151 7 160 3" fill="none" stroke={muted ? '#636A78' : '#0B7A4B'} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 42 C15 40 20 33 31 36 S45 24 57 29 S70 16 83 22 S100 18 112 19 S128 8 141 13 S151 7 160 3 V52 H0Z" fill={muted ? '#EDEFF2' : '#EAF8F1'} opacity=".75" />
    </svg>
  )
}

function PriceDelta({ up, change, amount }: { up: boolean; change: string; amount: string }) {
  return <div className={up ? 'delta positive' : 'delta negative'}><span>{up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}</span>{amount} <b>({change})</b></div>
}

function TopBar({ onNotifications }: { onNotifications: () => void }) {
  return <header className="topbar"><button className="icon-button"><Menu size={20} /></button><div className="brand"><BrandMark /><span>citron</span></div><div className="top-actions"><button className="icon-button notification" onClick={onNotifications}><Bell size={19} /><i /></button><button className="avatar">AK</button></div></header>
}

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const items: [Tab, typeof Home][] = [['Home', Home], ['Markets', LineChart], ['Portfolio', WalletCards], ['Orders', BriefcaseBusiness], ['Profile', UserRound]]
  return <nav className="bottom-nav" aria-label="Primary navigation">{items.map(([item, Icon]) => <button key={item} className={tab === item ? 'nav-item active' : 'nav-item'} onClick={() => setTab(item)}><Icon size={20} strokeWidth={tab === item ? 2.5 : 1.8} /><span>{item}</span></button>)}</nav>
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button className="text-button">{action}<ChevronRight size={15} /></button>}</div>
}

function HomeView({ onBuy }: { onBuy: () => void }) {
  return <>
    <div className="greeting"><div><p className="eyebrow">MONDAY, 17 JUNE 2024</p><h1>Good morning, Aanya</h1></div><button className="round-action"><Plus size={19} /></button></div>
    <section className="portfolio-hero"><div className="hero-top"><span>Total portfolio value</span><button className="more-button"><MoreHorizontal size={18} /></button></div><strong>₹2,48,650<span>.40</span></strong><div className="hero-meta"><PriceDelta up change="1.98%" amount="+₹4,820.20" /><span className="divider-dot">•</span><span>Today&apos;s P&amp;L</span></div><MiniChart /></section>
    <div className="quick-actions"><button onClick={onBuy}><span className="qa-icon citron"><ArrowUpRight size={18} /></span><b>Buy</b></button><button><span className="qa-icon ink"><ArrowDownRight size={18} /></span><b>Sell</b></button><button><span className="qa-icon soft"><Plus size={18} /></span><b>Add funds</b></button></div>
    <section><SectionTitle title="Market snapshot" action="View all" /><div className="market-strip"><div><span>NIFTY 50</span><b>23,465.10</b><PriceDelta up change="0.74%" amount="+172.80" /></div><div><span>SENSEX</span><b>77,301.14</b><PriceDelta up change="0.63%" amount="+482.70" /></div></div></section>
    <section><SectionTitle title="Your watchlist" action="Manage" /><div className="watchlist">{watchlist.map((asset) => <button className="asset-row" key={asset.ticker}><span className="asset-icon">{asset.ticker.slice(0, 1)}</span><span className="asset-name"><b>{asset.name}</b><small>{asset.ticker}</small></span><span className="asset-price"><b>{asset.price}</b><PriceDelta up={asset.up} change={asset.change} amount={asset.amount} /></span><Star size={16} className="star" /></button>)}</div></section>
    <section><SectionTitle title="Explore products" action="See marketplace" /><div className="product-card"><div className="product-visual"><TrendingUp size={23} /></div><div><span className="tag">FEATURED LISTING</span><h3>Solaris Green Energy Fund</h3><p>Curated basket · Moderate risk</p></div><ChevronRight size={18} className="product-chevron" /></div></section>
  </>
}

function MarketsView({ onBuy }: { onBuy: () => void }) {
  return <><div className="page-heading"><div><p className="eyebrow">MARKETS</p><h1>Find your next move</h1></div><button className="icon-button"><ListFilter size={19} /></button></div><div className="search-box"><Search size={18} /><span>Search stocks, ETFs and funds</span></div><div className="category-row"><button className="selected">All</button><button>Stocks</button><button>ETFs</button><button>Funds</button></div><section><SectionTitle title="Top movers" action="View all" /><div className="movers-grid"><div className="mover-card"><span>Top gainer</span><b>Adani Ports</b><strong className="positive">+4.82%</strong><MiniChart /></div><div className="mover-card"><span>Most active</span><b>Reliance</b><strong className="positive">+1.26%</strong><MiniChart muted /></div></div></section><section><SectionTitle title="All instruments" action="Filter" /><div className="watchlist">{[...watchlist, { name: 'Infosys', ticker: 'INFY', price: '₹1,464.20', change: '+1.04%', amount: '+₹15.10', up: true }].map((asset) => <button onClick={onBuy} className="asset-row" key={asset.ticker}><span className="asset-icon">{asset.ticker.slice(0, 1)}</span><span className="asset-name"><b>{asset.name}</b><small>{asset.ticker} · NSE</small></span><span className="asset-price"><b>{asset.price}</b><PriceDelta up={asset.up} change={asset.change} amount={asset.amount} /></span><Star size={16} className="star" /></button>)}</div></section></>
}

function PortfolioView() {
  return <><div className="page-heading"><div><p className="eyebrow">PORTFOLIO</p><h1>Your investments</h1></div><button className="icon-button"><MoreHorizontal size={19} /></button></div><div className="summary-card"><span>Invested amount</span><b>₹2,18,400.00</b><div className="summary-bottom"><span>Overall returns</span><PriceDelta up change="13.85%" amount="+₹30,250.40" /></div></div><div className="category-row wide"><button className="selected">Holdings <span>6</span></button><button>Positions</button></div><section><SectionTitle title="Holdings" action="Sort" /><div className="holding-list">{watchlist.map((asset, index) => <div className="holding-row" key={asset.ticker}><span className="asset-icon">{asset.ticker.slice(0, 1)}</span><div className="asset-name"><b>{asset.ticker}</b><small>{[12, 8, 15][index]} shares</small></div><div className="holding-value"><b>{['₹17,790', '₹14,054', '₹14,732'][index]}</b><PriceDelta up={asset.up} change={asset.change} amount={asset.amount} /></div></div>)}</div></section><section><SectionTitle title="Allocation" /><div className="allocation"><div className="donut"><div><b>₹2.4L</b><span>Total</span></div></div><div className="legend"><span><i className="legend-dot one" />Equity <b>68%</b></span><span><i className="legend-dot two" />ETFs <b>20%</b></span><span><i className="legend-dot three" />Funds <b>12%</b></span></div></div></section></>
}

function OrdersView() {
  return <><div className="page-heading"><div><p className="eyebrow">ACTIVITY</p><h1>Orders</h1></div><button className="icon-button"><ListFilter size={19} /></button></div><div className="category-row wide"><button className="selected">All <span>8</span></button><button>Open <span>2</span></button><button>Completed</button></div><section><div className="orders-list">{orders.map((order) => <div className="order-card" key={order.name}><div className="order-line"><span className={order.side === 'Buy' ? 'side buy' : 'side sell'}>{order.side}</span><span className="order-status">{order.status}</span></div><div className="order-main"><span className="asset-icon">{order.ticker.slice(0, 1)}</span><div className="asset-name"><b>{order.name}</b><small>{order.ticker} · {order.qty}</small></div><div className="holding-value"><b>{order.price}</b><small>{order.date}</small></div></div></div>)}</div></section></>
}

function ProfileView({ cvd, setCvd }: { cvd: boolean; setCvd: (v: boolean) => void }) {
  return <><div className="page-heading"><div><p className="eyebrow">ACCOUNT</p><h1>Your profile</h1></div><button className="icon-button"><Settings2 size={19} /></button></div><div className="profile-card"><div className="profile-avatar">AK</div><div><h3>Aanya Kapoor</h3><p>aanya.kapoor@email.com</p><span className="verified">✓ Verified account</span></div><ChevronRight size={18} /></div><section><SectionTitle title="Preferences" /><div className="settings-list"><div className="setting-row"><span className="setting-icon"><Settings2 size={17} /></span><div><b>Price colors</b><small>{cvd ? 'Color-vision safe' : 'Green up / Red down'}</small></div><button className={cvd ? 'toggle on' : 'toggle'} onClick={() => setCvd(!cvd)}><i /></button></div><div className="setting-row"><span className="setting-icon"><Bell size={17} /></span><div><b>Notifications</b><small>Price alerts and order updates</small></div><ChevronRight size={17} /></div><div className="setting-row"><span className="setting-icon"><CircleHelp size={17} /></span><div><b>Help &amp; support</b><small>We&apos;re here to help</small></div><ChevronRight size={17} /></div></div></section><section><SectionTitle title="My marketplace" /><div className="listing-banner"><div><span className="tag">SELL YOUR PRODUCTS</span><h3>Turn your ideas into income.</h3><p>List a product for the Citron community.</p></div><button className="small-primary"><Plus size={16} /> List product</button></div></section><button className="logout">Log out</button></>
}

function OrderModal({ close }: { close: () => void }) {
  const [quantity, setQuantity] = useState('10')
  const total = (Number(quantity || 0) * 1464.2).toLocaleString('en-IN', { minimumFractionDigits: 2 })
  return <div className="modal-backdrop" onClick={close}><div className="order-sheet" onClick={(e) => e.stopPropagation()}><div className="sheet-handle" /><div className="sheet-head"><div><span className="eyebrow">SIMULATED ORDER</span><h2>Buy Infosys</h2><p>NSE · ₹1,464.20 <span className="positive">+1.04%</span></p></div><button className="icon-button" onClick={close}><X size={19} /></button></div><div className="buy-sell"><button className="active">Buy</button><button>Sell</button></div><label>Quantity <span>Available: 42</span><input inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label><div className="estimate"><span>Estimated total</span><b>₹{total}</b></div><div className="estimate"><span>Available balance</span><b>₹68,420.00</b></div><button className="primary-button" onClick={close}>Review order <ChevronRight size={17} /></button><p className="demo-note">This is a simulated order for demonstration only.</p></div></div>
}

export default function Page() {
  const [tab, setTab] = useState<Tab>('Home')
  const [modal, setModal] = useState(false)
  const [cvd, setCvd] = useState(false)
  const content = useMemo(() => {
    if (tab === 'Markets') return <MarketsView onBuy={() => setModal(true)} />
    if (tab === 'Portfolio') return <PortfolioView />
    if (tab === 'Orders') return <OrdersView />
    if (tab === 'Profile') return <ProfileView cvd={cvd} setCvd={setCvd} />
    return <HomeView onBuy={() => setModal(true)} />
  }, [tab, cvd])
  return <main className="app-shell"><TopBar onNotifications={() => setTab('Orders')} /><div className="screen-content">{content}</div><BottomNav tab={tab} setTab={setTab} />{modal && <OrderModal close={() => setModal(false)} />}</main>
}
