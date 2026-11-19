import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { translations } from './translations'
import { businessAreas, products } from './data/content'

const whatsappNumber='917507192292'
const generalWhatsApp=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Trinord, I would like to know more about your company and services.')}`

function WhatsApp({ product, children }) {
  const text=product ? `Hello Trinord, I am interested in ${product}. Please share more information.` : 'Hello Trinord, I would like to know more about your company and services.'
  return <a className={children?.props?.className || ''} href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">{children}</a>
}

function Header() {
  const [open,setOpen]=useState(false)
  const {language,setLanguage}=useLanguage()
  const t=translations[language]
  const location=useLocation()
  useEffect(()=>setOpen(false),[location.pathname])
  const paths=['/','/about','/business','/products','/gallery','/contact']
  return <header className="navbar"><div className="container nav-inner">
    <Link className="logo" to="/" aria-label="Trinord homepage"><span className="logo-mark">T</span><span>TRINORD</span></Link>
    <nav className={`nav-links ${open?'open':''}`} aria-label="Primary navigation">
      {t.nav.map((label,i)=><NavLink key={paths[i]} to={paths[i]} className={({isActive})=>`nav-link ${isActive?'active':''}`}>{label}</NavLink>)}
      <div className="language" aria-label="Language">
        <button className={language==='en'?'active':''} onClick={()=>setLanguage('en')}>EN</button>
        <button className={language==='mr'?'active':''} onClick={()=>setLanguage('mr')}>मराठी</button>
      </div>
    </nav>
    <Link className="btn btn-primary nav-cta" to="/contact">{t.contact}</Link>
    <button className="menu-button" onClick={()=>setOpen(v=>!v)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  </div></header>
}

function Footer() {
  const {language}=useLanguage()
  const t=translations[language]
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div><Link className="logo" to="/" style={{color:'white'}}><span className="logo-mark">T</span><span>TRINORD</span></Link><p style={{maxWidth:290,lineHeight:1.7}}>“ध्यास लोकउन्नतीचा.. संकल्प नव्या भारताचा..”</p></div>
      <div><h4>{language==='en'?'Company':'कंपनी'}</h4><Link to="/about">{t.nav[1]}</Link><Link to="/business">{t.nav[2]}</Link><Link to="/gallery">{t.nav[4]}</Link></div>
      <div><h4>{language==='en'?'Explore':'जाणून घ्या'}</h4><Link to="/products">{t.nav[3]}</Link><Link to="/contact">{t.nav[5]}</Link></div>
      <div><h4>{language==='en'?'Contact':'संपर्क'}</h4><a href="tel:+917507192292">+91 7507 192 292</a><a href="tel:+919021666633">+91 9021 666 633</a><a href="mailto:trinordindia@gmail.com">trinordindia@gmail.com</a><p>Indraprastha Colony, Near Auxilium School, Manmad Road, Savedi, Ahilyanagar – 414003</p></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} TRINORD PVT. LTD.</span><span>GeM Marketplace & OM SAI ENTERPRISES</span></div>
  </div></footer>
}

function Layout({children}) {
  const location=useLocation()
  useEffect(()=>{
    window.scrollTo({top:0,behavior:'instant'})
  },[location.pathname])
  return <><Header/><main>{children}</main><Footer/><a className="whatsapp-float" href={generalWhatsApp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></>
}

function PageHero({title,copy,eyebrow}) {
  return <section className="page-hero"><div className="container"><div className="eyebrow" style={{color:'#f58220'}}>{eyebrow}</div><h1>{title}</h1><p>{copy}</p></div></section>
}

function CTA() {
  const {language}=useLanguage(); const t=translations[language]
  return <section className="cta"><div className="container cta-inner"><div><h2>{language==='en'?'Let’s discuss your requirement':'आपल्या गरजांवर चर्चा करूया'}</h2><p>{language==='en'?'Contact Trinord for product and solution enquiries.':'उत्पादन आणि समाधान चौकशीसाठी Trinord शी संपर्क साधा.'}</p></div><div className="cta-actions"><a className="btn btn-primary" href="tel:+917507192292"><Phone size={18}/> +91 7507 192 292</a><a className="btn btn-outline" href={generalWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a></div></div></section>
}

function Home() {
  useEffect(()=>{document.title='TRINORD PVT. LTD. | Corporate Solutions'},[])
  const {language}=useLanguage(); const t=translations[language]
  return <>
    <section className="hero"><div className="container hero-content"><motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}><div className="eyebrow" style={{color:'#f58220'}}>TRINORD PVT. LTD.</div><h1>{t.heroTitle}</h1><p>{t.heroText}</p><div className="hero-actions"><Link className="btn btn-primary" to="/business">{t.explore}<ArrowRight size={18}/></Link><Link className="btn btn-outline" to="/contact">{t.contact}</Link></div></motion.div></div></section>
    <section className="section"><div className="container grid-2"><motion.div className="feature-image" initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><img src="/assets/brochure/page-1.png" alt="Trinord education and community initiative theme"/></motion.div><div><div className="eyebrow">{language==='en'?'Company Profile':'कंपनी प्रोफाइल'}</div><h2 className="section-title">{language==='en'?'Purpose-led solutions for practical needs':'व्यावहारिक गरजांसाठी हेतूपुरस्पर समाधान'}</h2><p className="section-copy">TRINORD PVT. LTD. presents products and solutions across sanitation, solar energy, agriculture, education, electronics, furniture, water, security and public infrastructure.</p><h3 style={{color:'var(--navy)',marginBottom:8}}>{language==='en'?'Business Philosophy':'व्यावसायिक तत्वज्ञान'}</h3><p className="section-copy">“ध्यास लोकउन्नतीचा.. संकल्प नव्या भारताचा..”</p><Link className="card-link" to="/about">{t.learnMore}<ArrowRight size={16}/></Link></div></div></section>
    <section className="section section-light"><div className="container"><div className="eyebrow">{language==='en'?'Our Capabilities':'आमची क्षमता'}</div><h2 className="section-title">{language==='en'?'Our Business Areas':'आमचे व्यवसाय क्षेत्र'}</h2><p className="section-copy">{language==='en'?'A diversified portfolio designed to serve institutional, public and community requirements.':'संस्थात्मक, सार्वजनिक आणि सामुदायिक गरजा पूर्ण करण्यासाठी विविध उत्पादने.'}</p><div className="business-grid">{businessAreas.map(area=><motion.article className="business-card" key={area.slug} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><img src={area.image} alt={area[language].title} loading="lazy"/><div className="business-card-body"><h3>{area[language].title}</h3><p>{area[language].short}</p><Link className="card-link" to={`/business#${area.slug}`}>{t.learnMore}<ArrowRight size={15}/></Link></div></motion.article>)}</div></div></section>
    <section className="section"><div className="container"><div className="eyebrow">{language==='en'?'Selected Catalogue':'निवडक कॅटलॉग'}</div><h2 className="section-title">{t.featured}</h2><div className="product-grid">{products.slice(0,6).map(product=><article className="product-card" key={product.id}><img src={product.image} alt={product[language].name} loading="lazy"/><div className="product-card-body"><h3>{product[language].name}</h3><Link className="card-link" to="/products">{t.viewDetails}<ArrowRight size={15}/></Link></div></article>)}</div></div></section>
    <section className="section section-light"><div className="container"><div className="eyebrow">{language==='en'?'Our Approach':'आमचा दृष्टिकोन'}</div><h2 className="section-title">{t.why}</h2><div className="why-grid"><div className="why-item"><h3>{language==='en'?'Diverse solution portfolio':'विविध समाधान पोर्टफोलिओ'}</h3><p>{language==='en'?'Products across multiple practical sectors presented in one corporate catalogue.':'एकाच कॉर्पोरेट कॅटलॉगमध्ये अनेक व्यावहारिक क्षेत्रातील उत्पादने.'}</p></div><div className="why-item"><h3>{language==='en'?'Clear product enquiries':'स्पष्ट उत्पाद चौकशी'}</h3><p>{language==='en'?'Direct WhatsApp and phone enquiries help customers discuss the right solution.':'थेट WhatsApp आणि फोन चौकशी ग्राहकांना योग्य समाधान चर्चा करण्यास मदत करते.'}</p></div><div className="why-item"><h3>{language==='en'?'Editable company content':'संपादनीय कंपनी माहिती'}</h3><p>{language==='en'?'Business information is maintained clearly and can be confirmed or updated through the administration area.':'व्यावसायिक माहिती स्पष्टपणे व्यवस्थापित असून प्रशासनाद्वारे अद्ययावत करता येते.'}</p></div></div></div></section>
    <section className="section"><div className="container"><h2 className="section-title">{language==='en'?'From the Brochure':'ब्रोशर मधील झलक'}</h2><div className="gallery-grid">{[2,3,4,5,6,7].map(n=><div className="gallery-item" key={n}><img src={`/assets/brochure/page-${n}.png`} alt={`Trinord brochure page ${n}`} loading="lazy"/></div>)}</div></div></section>
    <CTA/>
  </>
}

function About() {
  useEffect(()=>{document.title='About Us | TRINORD PVT. LTD.'},[])
  const {language}=useLanguage()
  return <><PageHero eyebrow={language==='en'?'About TRINORD':'TRINORD बद्दल'} title={language==='en'?'Company Profile':'कंपनी प्रोफाइल'} copy={language==='en'?'Learn about Trinord’s business activities and represented associations.':'Trinord चे व्यवसाय आणि प्रतिनिधित्व असलेली सहकार्ये जाणून घ्या.'}/>
    <section className="section"><div className="container grid-2"><div><div className="eyebrow">{language==='en'?'Introduction':'परिचय'}</div><h2 className="section-title">TRINORD PVT. LTD.</h2><p className="section-copy">Trinord is presented as a multi-sector company offering products and solutions for waste management, sanitation, solar energy, agriculture, education, electronics, furniture, water, security and public infrastructure.</p><p className="section-copy">The Marathi brochure philosophy is “ध्यास लोकउन्नतीचा.. संकल्प नव्या भारताचा..”</p></div><div className="feature-image"><img src="/assets/brochure/page-1.png" alt="Trinord brochure identity"/></div></div></section>
    <section className="section section-light"><div className="container"><div className="business-grid">{[['Vision','Vision','vision'],['Mission','Mission','mission'],['Business Philosophy','व्यावसायिक तत्वज्ञान','philosophy']].map((item,i)=><article className="business-card" key={item[2]}><div className="business-card-body"><div className="eyebrow">0{i+1}</div><h3>{language==='en'?item[0]:item[1]}</h3><p>{i===2?'ध्यास लोकउन्नतीचा.. संकल्प नव्या भारताचा..':language==='en'?'Content placeholder: please confirm this statement with the client.':'माहितीचा प्रस्तावित मजकूर: कृपया ग्राहकांच्या मंजुरीसह निश्चित करा.'}</p></div></article>)}</div></div></section>
    <section className="section"><div className="container"><h2 className="section-title">{language==='en'?'Associations Represented in the Brochure':'ब्रोशरमध्ये प्रतिनिधित्व असलेल्या सहकार्यांची माहिती'}</h2><div className="grid-2"><img src="/assets/brochure/page-8.png" alt="Trinord brochure association and contact page" loading="lazy"/><div><h3 style={{color:'var(--navy)'}}>GeM</h3><p className="section-copy">The brochure identifies Trinord’s association with the Government e-Marketplace (GeM).</p><h3 style={{color:'var(--navy)',marginTop:28}}>OM SAI ENTERPRISES</h3><p className="section-copy">OM SAI ENTERPRISES is shown as a partner with Trinord in the brochure. No additional relationship details are inferred.</p></div></div></div></section><CTA/>
  </>
}

function Business() {
  useEffect(()=>{document.title='Our Business | TRINORD PVT. LTD.'},[])
  const {language}=useLanguage()
  return <><PageHero eyebrow={language==='en'?'Our Capabilities':'आमची क्षमता'} title={language==='en'?'Our Business':'आमचा व्यवसाय'} copy={language==='en'?'A focused overview of Trinord’s represented product and solution sectors.':'Trinord ने प्रतिनिधित्व केलेल्या उत्पादन आणि समाधान क्षेत्रांचा विहंगावलोकन.'}/>
    <section className="section"><div className="container">{businessAreas.map((area,i)=><article id={area.slug} key={area.slug} className="grid-2" style={{marginBottom:70}}><div className={i%2?'feature-image':'feature-image'}><img src={area.image} alt={area[language].title} loading="lazy"/></div><div><div className="eyebrow">0{i+1}</div><h2 className="section-title" style={{fontSize:'clamp(30px,4vw,44px)'}}>{area[language].title}</h2><p className="section-copy">{area[language].description}</p><WhatsApp><span className="btn btn-primary">{translations[language].enquire}</span></WhatsApp></div></article>)}</div></section><CTA/>
  </>
}

function ProductsPage() {
  useEffect(()=>{document.title='Products | TRINORD PVT. LTD.'},[])
  const {language}=useLanguage(); const t=translations[language]
  const [filter,setFilter]=useState('all'); const [selected,setSelected]=useState(null)
  const visible=filter==='all'?products:products.filter(p=>p.category===filter)
  const categories=useMemo(()=>['all','sanitation','solar','technology'],[])
  const labels={all:language==='en'?'All':'सर्व',sanitation:language==='en'?'Sanitation':'स्वच्छता',solar:language==='en'?'Solar':'सौर ऊर्जा',technology:language==='en'?'Technology':'तंत्रज्ञान'}
  return <><PageHero eyebrow={language==='en'?'Product Catalogue':'उत्पादन कॅटलॉग'} title={language==='en'?'Products':'उत्पादने'} copy={language==='en'?'Selected products represented in the Trinord brochure.':'Trinord ब्रोशरमध्ये दर्शवलेली निवडक उत्पादने.'}/><section className="section"><div className="container"><div className="filters">{categories.map(c=><button key={c} className={`filter ${filter===c?'active':''}`} onClick={()=>setFilter(c)}>{labels[c]}</button>)}</div><div className="product-grid">{visible.map(product=><article className="product-card" key={product.id}><img src={product.image} alt={product[language].name} loading="lazy"/><div className="product-card-body"><h3>{product[language].name}</h3><p style={{color:'#71808e',lineHeight:1.6}}>{product[language].description}</p><button className="card-link" style={{border:0,background:'none',padding:0,cursor:'pointer'}} onClick={()=>setSelected(product)}>{t.viewDetails}<ArrowRight size={15}/></button></div></article>)}</div></div></section>
    {selected&&<div className="modal-backdrop" onMouseDown={()=>setSelected(null)}><div className="modal" onMouseDown={e=>e.stopPropagation()}><img src={selected.image} alt={selected[language].name}/><div className="modal-body"><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X/></button><div className="eyebrow">{language==='en'?'Product':'उत्पादन'}</div><h2 style={{color:'var(--navy)',marginBottom:10}}>{selected[language].name}</h2><p style={{color:'#667783',lineHeight:1.7}}>{selected[language].description}</p><WhatsApp product={selected[language].name}><span className="btn btn-primary" style={{marginTop:20}}>{t.enquire}</span></WhatsApp></div></div></div>}<CTA/>
  </>
}

function Gallery() {
  useEffect(()=>{document.title='Gallery | TRINORD PVT. LTD.'},[])
  const {language}=useLanguage()
  return <><PageHero eyebrow={language==='en'?'Visual Gallery':'व्हिज्युअल गॅलरी'} title={language==='en'?'Gallery':'गॅलरी'} copy={language==='en'?'Product and solution imagery represented in the Trinord brochure.':'Trinord ब्रोशरमध्ये प्रतिनिधित्व केलेल्या उत्पादन आणि समाधानांची चित्रे.'}/><section className="section"><div className="container"><div className="gallery-grid">{[1,2,3,4,5,6,7,8].map(n=><div className="gallery-item" key={n}><img src={`/assets/brochure/page-${n}.png`} alt={`Trinord brochure image ${n}`} loading="lazy"/></div>)}</div></div></section><CTA/></>
}

function Contact() {
  useEffect(()=>{document.title='Contact Us | TRINORD PVT. LTD.'},[])
  const {language}=useLanguage(); const [sent,setSent]=useState(false)
  async function submit(e){e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget)); try{const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const body=await response.json().catch(()=>({}));if(!response.ok)throw new Error(body.message||'Submission failed');setSent(true);e.currentTarget.reset()}catch(error){setSent(false);alert(language==='en'?'Unable to submit. Please call or WhatsApp us.':'सबमिट करता आले नाही. कृपया कॉल किंवा WhatsApp करा.')}}
  return <><PageHero eyebrow={language==='en'?'Get in Touch':'संपर्क साधा'} title={language==='en'?'Contact Us':'संपर्क'} copy={language==='en'?'Send an enquiry or contact the Trinord team directly.':'चौकशी पाठवा किंवा Trinord टीमशी थेट संपर्क साधा.'}/><section className="section"><div className="container contact-grid"><div><h2 className="section-title" style={{fontSize:38}}>{language==='en'?'Contact Information':'संपर्क माहिती'}</h2><div className="contact-info"><div className="contact-row"><MapPin/><span>Indraprastha Colony, Near Auxilium School, Manmad Road, Savedi, Ahilyanagar, Maharashtra – 414003</span></div><div className="contact-row"><Phone/><a href="tel:+917507192292">+91 7507 192 292</a></div><div className="contact-row"><Phone/><a href="tel:+919021666633">+91 9021 666 633</a></div><div className="contact-row"><Mail/><a href="mailto:trinordindia@gmail.com">trinordindia@gmail.com</a></div></div><a className="btn btn-primary" style={{marginTop:18}} href={generalWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a></div><form className="contact-form" onSubmit={submit}><div className="field"><label>{language==='en'?'Name':'नाव'} *</label><input name="name" required minLength={2}/></div><div className="field"><label>{language==='en'?'Phone':'फोन'} *</label><input name="phone" required pattern="[0-9+\s()-]{7,20}"/></div><div className="field"><label>{language==='en'?'Email':'ई-मेल'}</label><input name="email" type="email"/></div><div className="field"><label>{language==='en'?'Subject':'विषय'} *</label><input name="subject" required/></div><div className="field"><label>{language==='en'?'Message':'संदेश'} *</label><textarea name="message" required minLength={10}/></div><button className="btn btn-navy" type="submit">{language==='en'?'Submit Enquiry':'चौकशी पाठवा'}</button>{sent&&<p style={{color:'#198754'}}>{language==='en'?'Thank you. Your enquiry has been submitted.':'धन्यवाद. तुमची चौकशी पाठवली आहे.'}</p>}</form></div><div className="container" style={{marginTop:50}}><iframe title="Trinord location" src="https://www.google.com/maps?q=Savedi,Ahilyanagar,Maharashtra&output=embed" width="100%" height="360" style={{border:0}} loading="lazy"/></div></section></>
}

function AdminLogin() {
  const [error,setError]=useState('')
  async function submit(e){e.preventEvent?.();e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));try{const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const body=await r.json();if(!r.ok)throw new Error(body.message||'Login failed');localStorage.setItem('trinord-admin-token',body.token);window.location.href='/admin'}catch(err){setError(err.message)}}
  return <div className="admin-login"><form className="login-card" onSubmit={submit}><div className="logo" style={{marginBottom:28}}><span className="logo-mark">T</span><span>TRINORD</span></div><h1 style={{color:'var(--navy)',fontSize:30}}>Administrator Login</h1><div className="field" style={{marginBottom:14}}><label>Email</label><input name="email" type="email" required/></div><div className="field" style={{marginBottom:18}}><label>Password</label><input name="password" type="password" required/></div><button className="btn btn-navy" type="submit" style={{width:'100%'}}>Sign In</button>{error&&<p style={{color:'#b42318',marginTop:14}}>{error}</p>}</form></div>
}

function AdminDashboard() {
  const [enquiries,setEnquiries]=useState([])
  const [enquiriesLoading,setEnquiriesLoading]=useState(true)
  const [enquiriesError,setEnquiriesError]=useState('')
  useEffect(()=>{
    const controller=new AbortController()
    async function loadEnquiries(){
      try{
        const token=localStorage.getItem('trinord-admin-token')
        const response=await fetch('/api/enquiries',{headers:{Authorization:`Bearer ${token}`},signal:controller.signal})
        const body=await response.json()
        if(controller.signal.aborted)return
        if(!response.ok)throw new Error(body.message||'Unable to load enquiries')
        setEnquiries(body)
        setEnquiriesError('')
      }catch(error){
        if(error.name!=='AbortError')setEnquiriesError(error.message)
      }finally{
        if(!controller.signal.aborted)setEnquiriesLoading(false)
      }
    }
    loadEnquiries()
    return ()=>controller.abort()
  },[])
  if (!localStorage.getItem('trinord-admin-token')) {
    window.location.replace('/admin/login')
    return null
  }
  return <div className="admin-shell"><aside className="admin-sidebar"><div className="logo" style={{color:'white',marginBottom:28}}><span className="logo-mark">T</span><span>TRINORD</span></div><a href="/admin">Dashboard</a><a href="/admin#company">Company Content</a><a href="/admin#business">Business Areas</a><a href="/admin#products">Featured Products</a><a href="/admin#gallery">Gallery</a><a href="/admin#settings">Contact Settings</a><a href="/admin#enquiries">Enquiries</a></aside><main className="admin-main"><h1 style={{color:'var(--navy)',marginTop:0}}>Admin Dashboard</h1><div className="stat-grid"><div className="stat"><strong>{products.length}</strong><span>Featured Products</span></div><div className="stat"><strong>8</strong><span>Gallery Images</span></div><div className="stat"><strong>{enquiries.length}</strong><span>Enquiries</span></div></div><h2 id="enquiries" style={{color:'var(--navy)',marginTop:36}}>Recent Enquiries</h2>{enquiriesLoading?<p role="status">Loading enquiries…</p>:enquiriesError?<p role="alert" style={{color:'#b42318'}}>{enquiriesError}</p>:<div style={{overflowX:'auto'}}><table className="admin-table"><thead><tr><th>Name</th><th>Phone</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead><tbody>{enquiries.map((e,i)=><tr key={e._id||i}><td>{e.name}</td><td>{e.phone}</td><td>{e.subject}</td><td>{e.createdAt?new Date(e.createdAt).toLocaleDateString():'-'}</td><td>{e.isRead?'Read':'Unread'}</td></tr>)}</tbody></table></div>}</main></div>
}

function NotFound(){return <div className="not-found"><div><h1 style={{color:'var(--navy)',fontSize:64}}>404</h1><p>The page you requested could not be found.</p><Link className="btn btn-navy" to="/">Return Home</Link></div></div>}

function AppRoutes(){
  return <Routes><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin" element={<AdminDashboard/>}/><Route path="*" element={<Layout><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/business" element={<Business/>}/><Route path="/products" element={<ProductsPage/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></Layout>}/></Routes>
}

export default function App(){return <LanguageProvider><BrowserRouter><AppRoutes/></BrowserRouter></LanguageProvider>}
