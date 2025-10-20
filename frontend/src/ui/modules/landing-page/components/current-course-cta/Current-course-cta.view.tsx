import { Container } from "@/ui/components/container/Container"
import { Typography } from "@/ui/design-system/typography/Typography"
import Image from "next/image"
import { RiPlayCircleLine } from "react-icons/ri"

export const CurrentCourseCtaView = () => {
    return(
    <>
        <div className="bg-gray-300">
            <Container className="py-24 text-center">
                <Typography variant="h2" component="h2" className="mb-2.5">Formations React.js gratuites</Typography>
                <Typography variant="lead" component="h3" className="mb-5">Apprends à coder l'app des singes codeurs</Typography>
                <Typography variant="caption-3" component="p" theme="gray" className="mb-16">Si tu veux un CV plus sexy que ton ex, suis cette formation complète!</Typography>
                <div className="relative h-[626px] bg-primary-300 rounded">
                    
                    <Image fill src="/assets/images/coder-monkeys-course.cta.png" alt={"illustration du cours"} className="rounded"/>
                    
                    <div className="gap-2 bg-gray flex flex-col items-center justify-center text-white h-full opacity-0 hover:opacity-95 animate rounded">
                        <RiPlayCircleLine size="42"/>
                        <Typography theme="white" variant="caption-2" className="uppercase">Lire la formation</Typography>
                    </div>
                </div>
            </Container>
        </div>
    </>
    )
}

// criar um retângulo de altura 626px que ocupa toda a largura, borda arredondada, cinza
// dentro dele, escrito-ícone num div animado e imagem
// you can be relaxed in a stressful situation
// caption-2 - Lire la formation