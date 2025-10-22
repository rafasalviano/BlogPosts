import { Container } from "@/ui/components/container/Container"
import { ActiveLink } from "@/ui/components/navigation/Active-link"
import { Box } from "@/ui/design-system/box/Box"
import { Typography } from "@/ui/design-system/typography/Typography"

export const UserAccountContainer = () => {
    return(
        <Container>
            <Typography theme="primary" variant="h4" className="pb-10">Seja bem-vindo!</Typography>
            <Box padding_y="py-9" className="py-9 flex flex-col gap-5 mb-16">
                <Typography variant="body-lg">Nesse app buscamos estimar a variação do custo energético de pequenas alterações de código.</Typography>
                <div>
                    <Typography variant="body-lg">
                        ⬅️  Na barra lateral à esquerda, temos duas opções de medição. 
                    </Typography>
                    <Typography variant="body-lg">Ambas vão medir quatro formas diferentes de recuperar e exibir posts.</Typography>
                    
                </div>
                <Typography variant="body-lg" weight="medium">
                    Clique naquela pela qual deseja começar.
                </Typography>
            </Box>
            <Box padding_y="py-7" className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <Typography theme="primary" variant="body-lg" className="mb-5">Explicação</Typography>
                    <Typography theme="black" variant="body-base" className="mb-1">• Meus posts - medição tela</Typography>
                    <Typography className="text-gray-700" variant="body-base">A medição é baseada na quantidade de dados enviados durante a busca de posts. Considera-se uma equivalência média de 0,051 kWh por GB transferido, de acordo com o estudo{" "}
                        <a
                            href="https://www.researchgate.net/publication/166968155_The_Energy_Intensity_of_the_Internet_Edge_and_Core_Networks"
                            target="_blank"
                            className="text-gray-800 underline text-sm"
                        >
                            <em>The Energy Intensity of the Internet</em>
                        </a>.
                        <Typography className="text-gray-700" variant="body-base">O valor é apenas uma estimativa, pois o consumo real varia conforme a intensidade energética da rede.</Typography>
                    </Typography>
                </div>
                <div className="flex flex-col gap-1">
                    <Typography theme="black" variant="body-base" className="mb-1">• Meus posts - CPU + GPU</Typography>
                    <Typography variant="body-base" className="text-gray-700 mb-4">A medição é feita localmente, acompanhando o uso de CPU e GPU enquanto o aplicativo busca os posts. As leituras são registradas a cada 1 segundo, salvas em arquivo .txt e depois convertidas para .csv.</Typography>
                </div>
                <Typography variant="body-lg" theme="primary">As 4 variações</Typography>
                <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-1 space-y-1">
                        <Typography variant="body-base">Sem compressão</Typography>
                        <Typography theme="gray" variant="body-base" className="max-w-40">
                            Não utiliza nenhuma compressão. Mostra todos os posts do banco de dados.                   
                        </Typography>
                    </div>
                    <div className="col-span-1 space-y-1">
                        <Typography variant="body-base">Com compressão</Typography>
                        <Typography theme="gray" variant="body-base" className="max-w-40">
                            Utiliza a compressão Brotli no backend. 
                        </Typography>
                    </div>
                    <div className="col-span-1 space-y-1">
                        <Typography variant="body-base">Sem paginação</Typography>
                        <Typography theme="gray" variant="body-base" className="max-w-40">
                            Não utiliza nenhuma paginação. Mostra todos os posts do banco de dados.                   
                        </Typography>
                    </div>
                    <div className="col-span-1 space-y-1">
                        <Typography variant="body-base">Com paginação</Typography>
                        <Typography theme="gray" variant="body-base" className="max-w-40">
                            Utiliza paginação. Mostra 15 posts por vez.
                        </Typography>
                    </div>
                </div>
                
            </Box>
        </Container>
    )
}