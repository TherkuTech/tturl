'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAnimation,useInView,motion } from "framer-motion"
import { useEffect, useRef } from "react"
import {LinkIcon,Zap,Shield, CheckCircle, ArrowBigDown, ArrowRight} from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"





const AnimatedSection=({children}:any)=>{
    const controls= useAnimation()
    const ref= useRef(null)

    const inView = useInView(ref)

    useEffect(()=>{
        if(inView){
            controls.start("visible")

        }
    },[controls,inView])

    return(
        <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{duration:0.5}}
        variants={{
            visible:{opacity:1,y:0},
            hidden:{opacity:0,y:50}
        }}
        >
            {children}
        </motion.div>
    )

}

const About = ()=>{
    return(
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <div className="absloute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="relative container mx-auto px-4 py-16 max-w-4xl">
                <AnimatedSection>
                    <h1 className="text-6xl font-bold text-center mb-8  bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                        Shorten Your Links,Amplify Your Impact
                    </h1>
                </AnimatedSection>
                <AnimatedSection>
                    <p className="text-2xl text-center mb-12 text-gray-300">
                        Transform lengthy URLs into powerful, concise links. Elevate your online presence with our cutting-edge URL shortene.
                    </p>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            { icon: LinkIcon, title: "Effortless Shortening", description: "Create short links instantly with our intuitive interface." },
                            { icon: Zap, title: "Lightning Speed", description: "Experience rapid link processing for maximum efficiency." },
                            { icon: Shield, title: "Ironclad Security", description: "Your data and links are protected with state-of-the-art encryption." }
                        ].map((feature,index)=>(
                            <Card key={index} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-white">
                                        <feature.icon className="mr-2 h-6 w-6 text-purple-500"/>
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="mb-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg filter blur-3xl"></div>
                        <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg">
                        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-400">How It Works</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                "Enter your long URL",
                                "Click 'Shorten'",
                                "Copy your new link",
                                "Share and track"
                            ].map((step,index)=>(
                                <div key={index} className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                                    <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg">
                                        {index+1}
                                    </div>
                                    <p className="text-gray-300 text-lg">{step}</p>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-purple-400">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                    {[
                        "Custom branded links",
                        "Comprehensive analytics",
                        "Developer-friendly API",
                        "24/7 expert support",
                        "Flexible pricing plans"
                    ].map((reason, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg hover:bg-gray-900/70 transition-all duration-300">
                        <CheckCircle className="text-green-500 flex-shrink-0 h-6 w-6" />
                        <p className="text-gray-300 text-lg">{reason}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold mb-6 text-purple-400">Ready to Revolutionize your Links?</h2>
                        <Link href={'/'}>
                          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg px-8 py-6 rounded-full">
                            Get Started Now
                            <ArrowRight className="ml-2 h-6 w-6"/>
                          </Button>
                        </Link>

                    </div>
                </AnimatedSection>


            </div>
        </div>
    )
}

export default About