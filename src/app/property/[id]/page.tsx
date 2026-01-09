import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Bed, Bath, Ruler, Check, Video, Box, Heart, Share2 } from 'lucide-react';
import { PROPERTIES } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { MapPlaceholder } from '@/components/search/MapPlaceholder';

// This is correct for Next.js 15+ async params
export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const property = PROPERTIES.find((p) => p.id === resolvedParams.id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    const crores = price / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  };

  return (
    <div className="bg-white pb-20">
      
      {/* Gallery Header */}
      <div className="h-[60vh] md:h-[70vh] relative bg-slate-100 flex">
        {/* Main Image */}
        <div className="relative w-full md:w-2/3 h-full">
            <Image
                src={property.mainImage}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
                priority
            />
            {/* <Link 
                href="/" 
                className="absolute top-6 left-6 z-[60] bg-white hover:bg-gray-100 text-blue-950 px-4 py-2 rounded-lg flex items-center transition-colors border-2 border-gray-200 shadow-md"
            >
                <ArrowLeft size={18} className="mr-2" /> Back to Home
            </Link> */}
        </div>
        {/* Side Grid Images (Desktop only) */}
        <div className="hidden md:flex flex-col w-1/3 h-full">
            {property.images.slice(0, 2).map((img, idx) => (
                <div key={idx} className="relative w-full h-1/2 border-l-4 border-white first:border-b-4">
                    <Image
                        src={img}
                        alt={`Interior view ${idx + 1}`}
                        fill
                        sizes="33vw"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
        
        {/* Action Buttons overlay */}
        <div className="absolute bottom-6 right-6 flex gap-3 z-10">
            <button className="bg-white px-4 py-2 rounded-lg text-blue-950 font-medium shadow-lg hover:bg-gray-100 flex items-center border-2 border-gray-200">
                <Box size={18} className="mr-2" /> 3D Tour
            </button>
            <button className="bg-white px-4 py-2 rounded-lg text-blue-950 font-medium shadow-lg hover:bg-gray-100 flex items-center border-2 border-gray-200">
                <Video size={18} className="mr-2" /> Video
            </button>
             <button className="bg-white p-2 rounded-lg text-blue-950 shadow-lg hover:bg-gray-100 border-2 border-gray-200">
                <Share2 size={20} />
            </button>
             <button className="bg-white p-2 rounded-lg text-blue-950 shadow-lg hover:bg-gray-100 border-2 border-gray-200">
                <Heart size={20} />
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                  
                  {/* Title Card */}
                  <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-gray-200">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div>
                              <div className="flex items-center gap-3 mb-2">
                                  <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded uppercase tracking-wide font-bold">{property.type}</span>
                                  <span className="bg-blue-950 text-white text-xs px-2 py-1 rounded uppercase tracking-wide font-bold">{property.status}</span>
                              </div>
                              <h1 className="text-3xl font-serif font-bold text-blue-950 mb-2">{property.title}</h1>
                              <div className="flex items-center text-gray-600">
                                  <MapPin size={18} className="mr-1 text-amber-500" />
                                  <span className="text-lg">{property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}</span>
                              </div>
                          </div>
                          <div className="text-3xl font-bold text-amber-500">
                              {formatPrice(property.price)}
                          </div>
                      </div>

                      <div className="flex justify-between items-center bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="text-center">
                              <div className="flex items-center justify-center text-blue-950 mb-1"><Bed size={24} /></div>
                              <div className="font-bold text-blue-950 text-xl">{property.specs.bedrooms}</div>
                              <div className="text-xs text-gray-600 uppercase tracking-widest">Beds</div>
                          </div>
                          <div className="w-px h-10 bg-gray-200" />
                          <div className="text-center">
                              <div className="flex items-center justify-center text-blue-950 mb-1"><Bath size={24} /></div>
                              <div className="font-bold text-blue-950 text-xl">{property.specs.bathrooms}</div>
                              <div className="text-xs text-gray-600 uppercase tracking-widest">Baths</div>
                          </div>
                          <div className="w-px h-10 bg-gray-200" />
                          <div className="text-center">
                              <div className="flex items-center justify-center text-blue-950 mb-1"><Ruler size={24} /></div>
                              <div className="font-bold text-blue-950 text-xl">{property.specs.sqft.toLocaleString()}</div>
                              <div className="text-xs text-gray-600 uppercase tracking-widest">Sq Ft</div>
                          </div>
                           <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                           <div className="text-center hidden sm:block">
                              <div className="font-bold text-blue-950 text-xl pt-1">{property.specs.yearBuilt}</div>
                              <div className="text-xs text-gray-600 uppercase tracking-widest">Year</div>
                          </div>
                      </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-gray-200">
                      <h2 className="text-xl font-bold text-blue-950 mb-4">About this Property</h2>
                      <p className="text-gray-600 leading-relaxed text-lg">
                          {property.description}
                      </p>
                  </div>

                  {/* Features */}
                  <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-gray-200">
                       <h2 className="text-xl font-bold text-blue-950 mb-6">Features & Amenities</h2>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {property.features.map((feature, idx) => (
                               <div key={idx} className="flex items-center text-gray-600">
                                   <div className="h-6 w-6 rounded-full bg-amber-100 text-blue-950 flex items-center justify-center mr-3 flex-shrink-0">
                                       <Check size={14} />
                                   </div>
                                   {feature}
                               </div>
                           ))}
                       </div>
                  </div>
                  
                  {/* Map Section */}
                  <div className="h-[400px] w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                        <MapPlaceholder properties={[property]} />
                  </div>

              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                  {/* Agent Card */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 sticky top-24">
                      <div className="flex items-center space-x-4 mb-6">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-amber-500">
                              <Image 
                                  src={property.agent.image} 
                                  alt={property.agent.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                              />
                          </div>
                          <div>
                              <h3 className="font-bold text-blue-950 text-lg">{property.agent.name}</h3>
                              <p className="text-gray-600 text-sm">{property.agent.role}</p>
                          </div>
                      </div>
                      
                      <div className="space-y-4">
                          <Button className="w-full">Schedule a Tour</Button>
                          <Button variant="outline" className="w-full">Message Agent</Button>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-semibold text-blue-950 mb-3">Ask a Question</h4>
                          <form className="space-y-3">
                              <input type="text" placeholder="Name" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950" />
                              <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950" />
                              <input type="tel" placeholder="Phone" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950" />
                              <textarea placeholder="I'm interested in this property..." rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950"></textarea>
                              <Button variant="secondary" className="w-full">Send Request</Button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
