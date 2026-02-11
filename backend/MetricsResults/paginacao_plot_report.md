# Relatório — paginacao

**Arquivo CSV:** `/Users/lambda/Tutoriais/blog-post/backend/MetricsResults/paginacao.csv`
**Imagem gerada:** `/Users/lambda/Tutoriais/blog-post/backend/MetricsResults/paginacao_plot.png`

## Grandezas e conversões
- `Total_mW` está em **miliwatts (mW)**.
- Conversão: **P(W) = P(mW) / 1000**.
- O tempo do eixo X está em **segundos**.

## Equações (método dos trapézios)
Energia consumida (em Joules):

**E = ∫ P(t) dt ≈ Σ ((Pᵢ + Pᵢ₊₁)/2) · Δt**

onde `P` está em **Watts** e `Δt` em **segundos**.

Potência média no intervalo ("área/ΔT"):

**P̄ = E / ΔT**

## Resultados
- Número de amostras: **8000**
- ΔT (duração total): **79.990000 s**
- Energia total estimada: **38.987600 J**
- Potência média (Energia/ΔT): **0.487406 W**

## Intervalo HTTP (marcado em vermelho no gráfico)
- HTTP_START (ms): `1502`
- HTTP_END (ms): `1605`
- Duração HTTP: **0.103000 s**

