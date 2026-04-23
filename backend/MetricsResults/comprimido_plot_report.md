# Relatório — comprimido

**Arquivo CSV:** `/Users/lambda/Tutoriais/blog-post/backend/MetricsResults/comprimido.csv`
**Imagem gerada:** `/Users/lambda/Tutoriais/blog-post/backend/MetricsResults/comprimido_plot.png`

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
- Energia total estimada: **157.737830 J**
- Potência média (Energia/ΔT): **1.971969 W**

## Intervalo HTTP (marcado em vermelho no gráfico)
- HTTP_START (ms): `1501`
- HTTP_END (ms): `9475`
- Duração HTTP: **7.974000 s**

