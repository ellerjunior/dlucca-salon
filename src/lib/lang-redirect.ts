/**
 * Idioma da primeira visita.
 *
 * Gera um script inline, que roda antes de a página ser pintada. Na página do
 * idioma padrão, ele leva o visitante para a versão no idioma dele:
 *
 * 1. Uma escolha salva (pelo seletor ou por uma visita anterior) sempre vence.
 * 2. Sem escolha salva, vale o primeiro idioma do navegador que o site tenha.
 * 3. Se nenhum servir, vale o país, deduzido do fuso horário do aparelho.
 *    Sem consulta de rede, a decisão é imediata e nada é enviado a terceiros.
 * 4. Se o fuso também não indicar nada, vale `rest`.
 *
 * Robôs de busca nunca são redirecionados, e quem chega direto numa página
 * traduzida (link compartilhado, resultado do Google) fica nela. O destino sai
 * de `alt`; sem ele, dos <link rel="alternate" hreflang> da página; sem eles,
 * de `prefix`.
 * Clicar num link com `hreflang` ou `data-lang-choice` salva a escolha.
 */

export type LangRedirectConfig = {
  /** Chave no localStorage. */
  key: string;
  /** Idiomas do site, pela parte principal da tag ("pt", não "pt-BR"). */
  langs: string[];
  /** Idioma padrão do site. Só as páginas nesse idioma redirecionam. */
  def: string;
  /** Idioma desta página. */
  page: string;
  /** Idioma de quem não é identificado pelo navegador nem pelo fuso. */
  rest: string;
  /** Fusos IANA por idioma. Um item que termina em "/" vale como prefixo. */
  zones: Record<string, string[]>;
  /** Endereço desta página em cada idioma, quando o projeto já sabe. Vence os alternates. */
  alt?: Record<string, string>;
  /**
   * Prefixo de cada idioma, usado quando a página não tem alternates. Se o
   * idioma padrão também tiver prefixo (como "/pt"), ele é trocado pelo outro.
   */
  prefix?: Record<string, string>;
};

/** Brasil, Portugal e países lusófonos da África e da Ásia. */
export const PT_ZONES = [
  "America/Sao_Paulo", "America/Noronha", "America/Belem", "America/Fortaleza",
  "America/Recife", "America/Araguaina", "America/Maceio", "America/Bahia",
  "America/Campo_Grande", "America/Cuiaba", "America/Santarem",
  "America/Porto_Velho", "America/Boa_Vista", "America/Manaus",
  "America/Eirunepe", "America/Rio_Branco", "Brazil/",
  "Europe/Lisbon", "Atlantic/Madeira", "Atlantic/Azores", "Portugal",
  "Africa/Luanda", "Africa/Maputo", "Atlantic/Cape_Verde", "Africa/Bissau",
  "Africa/Sao_Tome", "Asia/Dili",
];

/** Espanha, México e os países de língua espanhola das Américas e da África. */
export const ES_ZONES = [
  "Europe/Madrid", "Africa/Ceuta", "Atlantic/Canary",
  "America/Mexico_City", "America/Cancun", "America/Merida",
  "America/Monterrey", "America/Matamoros", "America/Chihuahua",
  "America/Ciudad_Juarez", "America/Ojinaga", "America/Mazatlan",
  "America/Bahia_Banderas", "America/Hermosillo", "America/Tijuana", "Mexico/",
  "America/Argentina/", "America/Buenos_Aires", "America/La_Paz",
  "America/Santiago", "America/Punta_Arenas", "Pacific/Easter", "Chile/",
  "America/Bogota", "America/Costa_Rica", "America/Havana", "Cuba",
  "America/Santo_Domingo", "America/Guayaquil", "Pacific/Galapagos",
  "America/El_Salvador", "America/Guatemala", "America/Tegucigalpa",
  "America/Managua", "America/Panama", "America/Asuncion", "America/Lima",
  "America/Puerto_Rico", "America/Montevideo", "America/Caracas",
  "Africa/Malabo",
];

/** Itália, San Marino e Vaticano. */
export const IT_ZONES = ["Europe/Rome", "Europe/San_Marino", "Europe/Vatican"];

// ES5 de propósito: roda inline, sem passar pelo bundler.
const SOURCE = `function (c) {
  try {
    var n = navigator;
    var base = function (t) { return String(t || "").toLowerCase().split("-")[0]; };
    var known = function (l) { return c.langs.indexOf(l) > -1; };
    var save = function (l) { try { localStorage.setItem(c.key, l); } catch (e) {} };

    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest && e.target.closest("a[hreflang], [data-lang-choice]");
      if (!a) return;
      var l = base(a.getAttribute("data-lang-choice") || a.getAttribute("hreflang"));
      if (known(l)) save(l);
    }, true);

    if (c.page !== c.def) return;
    if (n.webdriver || /bot|crawl|spider|slurp|lighthouse|preview|headless/i.test(n.userAgent || "")) return;

    var want = null;
    try { want = localStorage.getItem(c.key); } catch (e) {}
    if (!known(want)) {
      want = null;
      var list = n.languages && n.languages.length ? n.languages : [n.language];
      for (var i = 0; i < list.length && !want; i++) if (known(base(list[i]))) want = base(list[i]);
      if (!want) {
        var tz = "";
        try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
        for (var l in c.zones) {
          for (var j = 0; j < c.zones[l].length; j++) {
            var z = c.zones[l][j];
            if (tz === z || (z.slice(-1) === "/" && tz.indexOf(z) === 0)) want = l;
          }
        }
      }
      want = want || c.rest;
      save(want);
    }
    if (want === c.def) return;

    var href = c.alt && c.alt[want] ? c.alt[want] : null;
    var alts = document.querySelectorAll('link[rel="alternate"][hreflang]');
    for (var k = 0; k < alts.length && !href; k++) {
      if (base(alts[k].getAttribute("hreflang")) === want) href = alts[k].getAttribute("href");
    }
    if (!href && c.prefix && c.prefix[want] != null) {
      var path = location.pathname, own = c.prefix[c.def] || "";
      if (own && path.indexOf(own) === 0) path = path.slice(own.length) || "/";
      href = path === "/" ? c.prefix[want] || "/" : c.prefix[want] + path;
    }
    if (!href) return;

    var to = new URL(href, location.href).pathname;
    if (to.replace(/\\/$/, "") === location.pathname.replace(/\\/$/, "")) return;
    document.documentElement.style.visibility = "hidden";
    location.replace(to + location.search + location.hash);
  } catch (e) {}
}`;

/** O script pronto para um <script> inline. */
export function langRedirectScript(config: LangRedirectConfig): string {
  return `(${SOURCE})(${JSON.stringify(config)});`;
}
