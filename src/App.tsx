import { useState } from 'react';
import { Check, Copy, Zap } from 'lucide-react';
import { VideoSection } from './components/VideoSection';
import { getBrokerUrl, getTelegramUrl } from './config/links';

interface DepositTier {
  id: string;
  deposit: string;
  potential: string;
}

const DEPOSIT_TIERS: DepositTier[] = [
  {
    id: 'tier-300',
    deposit: 'R$ 300',
    potential: 'Potencial de até R$ 600',
  },
  {
    id: 'tier-500',
    deposit: 'R$ 500',
    potential: 'Potencial de até R$ 1.000',
  },
  {
    id: 'tier-1000',
    deposit: 'R$ 1.000',
    potential: 'Potencial de até R$ 2.000',
  },
];

export default function App() {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-1000');
  const [copiedKeyword, setCopiedKeyword] = useState<boolean>(false);
  const [brokerOpened, setBrokerOpened] = useState<boolean>(false);

  const selectedTier = DEPOSIT_TIERS.find((t) => t.id === selectedTierId);
  const telegramUrl = getTelegramUrl(selectedTier?.deposit);
  const brokerUrl = getBrokerUrl();

  const handleCopyKeyword = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('DESTRAVAR A IA').catch(() => {});
    }
    setCopiedKeyword(true);
    window.setTimeout(() => setCopiedKeyword(false), 2200);
  };

  return (
    <div className="min-h-screen operax-page-bg text-[#f7fff6] flex flex-col">
      {/* Top Bar */}
      <header className="w-full max-w-[980px] mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between gap-8">
        <a
          href="#topo"
          className="text-[19px] sm:text-[21px] font-extrabold tracking-[-0.04em] uppercase text-[#f7fff6] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5bf547] rounded"
        >
          OPERA<span className="text-[#5bf547]">X</span>
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCopyKeyword}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09150d] hover:bg-[#0f2216] border border-[#1d3925] hover:border-[#5bf547]/50 text-[12px] font-bold text-[#f7fff6] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5bf547]"
        >
          <Zap className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b] shrink-0" />
          <span>Destrave sua I.A hoje</span>
        </a>
      </header>

      <main id="topo" className="flex-1 w-full px-4 sm:px-6">
        {/* Hero Copy & Primary Conversion Block */}
        <section className="w-full max-w-[920px] mx-auto pt-4 sm:pt-7 pb-6 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-[12px] font-extrabold tracking-[0.08em] uppercase text-[#5bf547]">
            <span aria-hidden="true">📌</span>
            <span>OPERAX I.A.</span>
            <span aria-hidden="true">•</span>
            <span>CONDIÇÃO ESPECIAL</span>
          </div>

          {/* HEADLINE PRINCIPAL (h1) */}
          <h1 className="mt-3.5 text-[clamp(2rem,4.5vw,3.45rem)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[#f7fff6] text-balance max-w-[880px] mx-auto">
            Descubra e lucre até 100% com os{' '}
            <span className="text-[#5bf547]">
              ativos de maior volatilidade do momento!
            </span>
          </h1>

          {/* HEADLINE SECUNDÁRIA (h2) */}
          <h2 className="mt-4 text-[clamp(1.15rem,2.2vw,1.55rem)] font-bold tracking-[-0.02em] leading-[1.3] text-[#d8f8dc] text-balance max-w-[740px] mx-auto">
            Use a seu favor todo poder da IA para encontrar os melhores ativos e lucrar rápido
          </h2>

          {/* SUB-HEADLINE (h3) */}
          <h3 className="mt-4 text-[14.5px] sm:text-[16.5px] font-normal leading-[1.6] text-[#b0c4b5] text-balance max-w-[760px] mx-auto">
            <strong className="font-bold text-[#f7fff6]">NOTA:</strong> OperaX
            está liberando sua IA mais precisa, agora você pode ter{' '}
            <span className="font-semibold text-[#e6f9e8]">
              ganhos de até 100%
            </span>{' '}
            no mercado de forma imediata
          </h3>

          {/* Top CTA Buttons (Preserved from validated page) */}
          <div className="mt-7 max-w-[590px] mx-auto flex flex-col gap-3">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyKeyword}
              className="w-full h-[54px] sm:h-[56px] rounded-[14px] operax-btn-primary text-[#041207] font-extrabold text-[15px] flex items-center justify-center px-6 transition-transform duration-150 active:scale-[0.99] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7fff6]"
            >
              Enviar comprovante no Telegram
            </a>

            <a
              href={brokerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setBrokerOpened(true)}
              className="w-full h-[52px] sm:h-[54px] rounded-[14px] bg-[#102016] hover:bg-[#152a1d] border border-[#22432c] text-[#f7fff6] font-bold text-[15px] flex items-center justify-center px-6 transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5bf547]"
            >
              Abrir a corretora
            </a>
          </div>

          {brokerOpened && (
            <div className="mt-3.5 max-w-[590px] mx-auto rounded-[12px] bg-[#122619] border border-[#2a5436] px-4 py-3 text-[12.5px] text-[#d9eedd] flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>
                Corretora aberta! Após depositar, envie o comprovante no
                Telegram com a mensagem{' '}
                <strong className="text-[#5bf547]">"DESTRAVAR A IA"</strong>.
              </span>
              <button
                type="button"
                onClick={handleCopyKeyword}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b3824] hover:bg-[#23472e] text-[11.5px] font-bold text-[#f7fff6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedKeyword ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#5bf547]" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#5bf547]" />
                    <span>Copiar código</span>
                  </>
                )}
              </button>
            </div>
          )}

          <p className="mt-3.5 text-[11.5px] sm:text-[12px] text-[#7c9382]">
            Assista ao vídeo e consulte as condições antes de realizar qualquer
            depósito.
          </p>
        </section>

        {/* HEADLINE DE APOIO (h4) + VIDEO */}
        <section className="w-full max-w-[980px] mx-auto pt-1 pb-2">
          <h4 className="mb-3.5 text-center text-[12.5px] sm:text-[14px] font-extrabold tracking-[0.05em] uppercase text-[#5bf547] text-balance">
            VEJA VÍDEO PARA DESCOBRIR MELHOR FORMA DE LUCRAR RÁPIDO
          </h4>

          <VideoSection />
        </section>

        {/* BELOW VIDEO — INTACT SECTIONS FROM VALIDATED PAGE */}

        {/* Section 1: Como funciona */}
        <section
          aria-labelledby="como-funciona-heading"
          className="w-full max-w-[980px] mx-auto mt-7 rounded-[22px] bg-[#0d1e14] border border-[#1c3825] p-6 sm:p-8"
        >
          <h2
            id="como-funciona-heading"
            className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.025em] text-[#f7fff6] flex items-center gap-2.5"
          >
            <span aria-hidden="true" className="text-[22px] sm:text-[24px]">
              ⚠️
            </span>
            <span>Como funciona</span>
          </h2>

          <p className="mt-2.5 text-[14px] sm:text-[15px] leading-[1.6] text-[#b4c6b8]">
            Você escolhe uma das faixas disponíveis, realiza o depósito e envia
            o comprovante para o suporte. A I.A participa da operação com base
            no valor informado, dentro das regras da campanha.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {DEPOSIT_TIERS.map((tier) => {
              const isSelected = tier.id === selectedTierId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`text-left rounded-[14px] p-5 transition-colors duration-150 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5bf547] ${
                    isSelected
                      ? 'operax-tier-card-highlight border-[#35663b]'
                      : 'operax-tier-card border-[#213e2a] hover:border-[#2e5739]'
                  }`}
                >
                  <div className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.02em] text-[#f7fff6] tabular-nums">
                    {tier.deposit}
                  </div>
                  <div className="mt-1 text-[13px] font-bold text-[#5bf547] tabular-nums">
                    {tier.potential}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3.5 rounded-[14px] bg-[#1a2e1c] border border-[#2d4d30] px-4 py-3.5 text-[13px] sm:text-[13.5px] leading-[1.55] text-[#d6e6d8]">
            <span aria-hidden="true" className="mr-1.5">
              🚨
            </span>
            <strong className="font-bold text-[#f7fff6]">
              Vagas encerram hoje:
            </strong>{' '}
            após realizar o depósito, envie o comprovante no suporte e escreva{' '}
            <button
              type="button"
              onClick={handleCopyKeyword}
              title="Clique para copiar"
              className="font-extrabold text-[#f7fff6] underline decoration-[#5bf547]/60 underline-offset-2 hover:text-[#5bf547] transition-colors cursor-pointer"
            >
              "DESTRAVAR A IA"
            </button>{' '}
            {copiedKeyword && (
              <span className="text-[11.5px] font-bold text-[#5bf547] mr-1">
                (copiado!)
              </span>
            )}
            para consultar sua participação.
          </div>
        </section>

        {/* Section 2: Passo a passo */}
        <section
          aria-labelledby="passo-a-passo-heading"
          className="w-full max-w-[980px] mx-auto mt-6 rounded-[22px] bg-[#0d1e14] border border-[#1c3825] p-6 sm:p-8"
        >
          <h2
            id="passo-a-passo-heading"
            className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.025em] text-[#f7fff6] flex items-center gap-2.5"
          >
            <span aria-hidden="true" className="text-[22px] sm:text-[24px]">
              📌
            </span>
            <span>Passo a passo</span>
          </h2>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Step 1 */}
            <div className="rounded-[14px] bg-[#13261b] border border-[#213f2b] p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-[5px] bg-[#3b82f6] text-[#ffffff] text-[11px] font-extrabold tabular-nums shrink-0">
                  1
                </span>
                <span className="text-[15px] font-bold text-[#5bf547]">
                  Abra a corretora
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-[1.55] text-[#b4c6b8]">
                Acesse sua conta e escolha o valor da participação.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-[14px] bg-[#13261b] border border-[#213f2b] p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-[5px] bg-[#3b82f6] text-[#ffffff] text-[11px] font-extrabold tabular-nums shrink-0">
                  2
                </span>
                <span className="text-[15px] font-bold text-[#5bf547]">
                  Faça o depósito
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-[1.55] text-[#b4c6b8]">
                O valor mínimo informado para esta ação é de R$ 300.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-[14px] bg-[#13261b] border border-[#213f2b] p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-[20px] h-[20px] rounded-[5px] bg-[#3b82f6] text-[#ffffff] text-[11px] font-extrabold tabular-nums shrink-0">
                  3
                </span>
                <span className="text-[15px] font-bold text-[#5bf547]">
                  Envie o comprovante
                </span>
              </div>
              <p className="mt-2.5 text-[13px] leading-[1.55] text-[#b4c6b8]">
                Fale com o suporte no Telegram e envie "DESTRAVAR A IA".
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Final Conversion Card */}
        <section
          aria-labelledby="cta-final-heading"
          className="w-full max-w-[980px] mx-auto mt-6 rounded-[22px] operax-bottom-cta-card border border-[#1f3d26] px-6 py-8 sm:px-10 sm:py-10 text-center"
        >
          <h2
            id="cta-final-heading"
            className="text-[26px] sm:text-[34px] font-extrabold tracking-[-0.03em] text-[#f7fff6] text-balance"
          >
            Quer destravar sua I.A hoje?
          </h2>

          <p className="mt-3 text-[14px] sm:text-[15.5px] leading-[1.6] text-[#b4c6b8] max-w-[650px] mx-auto text-balance">
            Acesse a corretora, escolha sua faixa e envie o comprovante para o
            suporte enquanto as vagas desta ação ainda estiverem disponíveis.
          </p>

          <div className="mt-6 max-w-[590px] mx-auto flex flex-col gap-3">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCopyKeyword}
              className="w-full h-[54px] sm:h-[56px] rounded-[14px] operax-btn-primary text-[#041207] font-extrabold text-[15px] flex items-center justify-center px-6 transition-transform duration-150 active:scale-[0.99] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7fff6]"
            >
              Enviar comprovante agora
            </a>

            <a
              href={brokerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setBrokerOpened(true)}
              className="w-full h-[52px] sm:h-[54px] rounded-[14px] bg-[#102016] hover:bg-[#152a1d] border border-[#22432c] text-[#f7fff6] font-bold text-[15px] flex items-center justify-center px-6 transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5bf547]"
            >
              Abrir a corretora
            </a>
          </div>
        </section>
      </main>

      {/* Footer Disclaimer */}
      <footer className="w-full max-w-[980px] mx-auto px-4 pt-8 pb-12 text-center">
        <p className="text-[11.5px] text-[#6d8273]">
          Conteúdo promocional. Operações de mercado envolvem risco e não há
          garantia de retorno.
        </p>
      </footer>
    </div>
  );
}
