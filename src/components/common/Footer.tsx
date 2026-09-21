import Link from 'next/link';
import { Phone, ArrowRight, Apple, Play, ShieldCheck } from 'lucide-react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300 font-sans mt-20">
      {/* Top Section */}
      <div className="border-b border-slate-800/80 py-16 text-center flex flex-col items-center px-4">
        <Button variant="outline" className="border-slate-600 bg-transparent text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wide hover:bg-white/10 hover:text-white transition-colors mb-4">
          GET IN TOUCH
        </Button>
        <p className="text-slate-400 text-sm mb-2">or Call</p>
        <h2 className="text-white text-3xl md:text-4xl font-bold">(+1) 424 283 4838</h2>
      </div>

      {/* Middle Section (Grid of Links) */}
      <div className="border-b border-slate-800/80 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Hospitals in Countries</h3>
            <ul className="space-y-4 text-sm text-[#94a3b8]">
              <li><Link href="#" className="hover:text-white transition-colors">Hospitals in Turkey</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hospitals in India</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hospitals in Singapore</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hospitals in UAE</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hospitals in Thailand</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hospitals in Malaysia</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">View All Destinations</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Orthopedics</h3>
            <ul className="space-y-4 text-sm text-[#94a3b8]">
              <li><Link href="#" className="hover:text-white transition-colors">Total Hip Replacement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Knee Replacement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Disc Replacement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Ankle Fusion Surgery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hip Resurfacing Surgery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Knee Arthroscopy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Limb Lengthening</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Cardiac Science</h3>
            <ul className="space-y-4 text-sm text-[#94a3b8]">
              <li><Link href="#" className="hover:text-white transition-colors">Angiography</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Angioplasty</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">CABG</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Double Heart Valve Replacement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">AVR / MVR</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pacemaker Implant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Fontan</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Transplants</h3>
            <ul className="space-y-4 text-sm text-[#94a3b8]">
              <li><Link href="#" className="hover:text-white transition-colors">Kidney Transplant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Liver Transplant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bone Marrow Transplant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Heart Transplant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hand Transplant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Lung Transplant</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Breast Cancer</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Oncology</h3>
            <ul className="space-y-4 text-sm text-[#94a3b8]">
              <li><Link href="#" className="hover:text-white transition-colors">Colon Cancer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Stomach Cancer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cervical Cancer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Lung Cancer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Prostate Cancer</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">CAR-T</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Brain Cancer</Link></li>
            </ul>
          </div>

          {/* Column 6 */}
          <div>
            <h3 className="text-white font-semibold mb-6">Neurology</h3>
            <ul className="space-y-4 text-sm text-[#94a3b8]">
              <li><Link href="#" className="hover:text-white transition-colors">VP Shunt</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Spinal Fusion</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Microdiscectomy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Craniotomy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Deep Brain Stimulation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Scoliosis</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Brain Tumour</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom-mid Section */}
      <div className="border-b border-slate-800/80 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Social */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-lg">
                C
              </div>
              <span className="text-xl font-bold text-white">Caregiver Agency BD</span>
            </div>
            <p className="text-[#94a3b8] text-sm mb-8 leading-relaxed">
              Bangladesh's most trusted online pharmacy and healthcare platform.
            </p>
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-wider mb-4 uppercase">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm text-[#94a3b8]">
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>Home</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>About Us</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>Life At CaregiverBD</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>Blog</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>Care Package</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>Product & Services</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>CCP</Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-slate-600"></span>Contact Us</Link>
            </div>
          </div>

          {/* Newsletter & Help Desk */}
          <div>
            <h3 className="text-white font-semibold mb-6">Subscribe for Newsletter</h3>
            <div className="flex mb-10 h-11">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-[#1e293b] text-white px-4 py-2 rounded-l-lg outline-none w-full border border-[#1e293b] focus:border-blue-500 text-sm placeholder:text-slate-500 transition-colors"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-l-none rounded-r-lg flex items-center justify-center transition-colors h-full px-5">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <h3 className="text-xs font-semibold text-slate-500 tracking-wider mb-4 uppercase">Patient Help Desk</h3>
            <div className="space-y-3 text-sm text-[#94a3b8]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>(+1) 424 283 4838</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>(+66) 977 830 667</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>(+90) 212 900 6707</span>
              </div>
            </div>
          </div>

          {/* App Download */}
          <div>
            <h3 className="text-white font-semibold mb-6">Download Our App</h3>
            <p className="text-[#94a3b8] text-sm mb-6">
              Order medicines and consult doctors on the go.
            </p>
            <div className="flex flex-col gap-4">
              {/* App Store Button */}
              <a href="#" className="flex items-center gap-4 bg-transparent border border-[#1e293b] hover:bg-[#1e293b] rounded-xl p-3 transition-colors">
                <Apple className="w-7 h-7 text-white ml-2" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Download on the</span>
                  <span className="text-sm font-semibold text-white">App Store</span>
                </div>
              </a>
              {/* Google Play Button */}
              <a href="#" className="flex items-center gap-4 bg-transparent border border-[#1e293b] hover:bg-[#1e293b] rounded-xl p-3 transition-colors">
                <Play className="w-7 h-7 text-white ml-2 fill-white" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">Get it on</span>
                  <span className="text-sm font-semibold text-white">Google Play</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 px-6 text-sm text-[#64748b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Caregiver Agency BD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="flex items-center gap-1.5 text-blue-500 font-medium">
              <ShieldCheck className="w-4 h-4" />
              SSL Secured
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
