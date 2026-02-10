import { motion } from "framer-motion";
import { Hammer, Factory, Wrench, Settings, ArrowRight, Truck, HardHat } from "lucide-react";

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-slate-900 py-20 text-white relative overflow-hidden">
        {/* abstract engineering bg */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">Our Services</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Comprehensive industrial solutions delivered with precision and expertise.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <ServiceDetailCard 
            icon={<Hammer className="w-12 h-12" />}
            title="Construction"
            description="We handle complete structural construction projects for industrial plants, warehouses, and commercial facilities. Our team manages everything from foundation to finishing."
            features={["Structural Steel Erection", "Foundation Works", "Warehouse Construction", "Site Development"]}
            image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000"
          />
          
          <ServiceDetailCard 
            icon={<Factory className="w-12 h-12" />}
            title="Metal Fabrication"
            description="Our fabrication shop is equipped with advanced machinery to produce custom metal components. We specialize in steel, aluminum, and alloy fabrication."
            features={["Custom Steel Structures", "CNC Machining", "Sheet Metal Works", "Welding & Assembly"]}
            image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000"
          />
          
          <ServiceDetailCard 
            icon={<Wrench className="w-12 h-12" />}
            title="Plant Maintenance"
            description="Keep your operations running smoothly with our scheduled and emergency maintenance services. We minimize downtime and extend equipment life."
            features={["Preventive Maintenance", "Emergency Repairs", "Equipment Overhauls", "Shutdown Management"]}
            image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
          />
          
          <ServiceDetailCard 
            icon={<Settings className="w-12 h-12" />}
            title="Mechanical Works"
            description="From complex machinery installation to piping systems, our mechanical engineering team delivers precise and reliable solutions."
            features={["Machinery Installation", "Industrial Piping", "Hydraulic Systems", "Conveyor Systems"]}
            image="https://images.unsplash.com/photo-1531297461136-82lw9f22067f?auto=format&fit=crop&q=80&w=1000"
          />
        </motion.div>
      </div>

      {/* Process Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase text-slate-900 mb-4">Our Process</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10" />
            
            <ProcessStep number="01" title="Consultation" icon={<Truck className="w-6 h-6" />} />
            <ProcessStep number="02" title="Planning" icon={<Settings className="w-6 h-6" />} />
            <ProcessStep number="03" title="Execution" icon={<HardHat className="w-6 h-6" />} />
            <ProcessStep number="04" title="Delivery" icon={<ArrowRight className="w-6 h-6" />} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceDetailCard({ icon, title, description, features, image }: any) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={item} className="bg-white rounded-lg overflow-hidden shadow-lg border border-slate-100 group">
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-primary/10 text-primary rounded-sm mr-4">
            {icon}
          </div>
          <h2 className="text-2xl font-bold uppercase text-slate-900">{title}</h2>
        </div>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((feat: string, i: number) => (
            <li key={i} className="flex items-center text-sm font-medium text-slate-700">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProcessStep({ number, title, icon }: any) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm w-full md:w-48 my-4 md:my-0 z-10 border border-slate-100">
      <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-slate-900/20">
        {number}
      </div>
      <h3 className="font-bold uppercase text-sm">{title}</h3>
      <div className="mt-2 text-primary opacity-50">{icon}</div>
    </div>
  );
}
