// Definir área de interesse ----------------------------------------------------
// Estado de Minas Gerais
// var estados = ee.FeatureCollection("users/egorgens/zap/br_estados");
// var aoi = ee.FeatureCollection(estados).filterMetadata('ESTADO', 'equals', 'MG');

// Bacia do Rio Preto (área piloto)
var aoi = ee.FeatureCollection("users/huezersperandio/ptosRef/bacia_rp_sta");
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: aoi,
  color: 1,
  width: 3
});
Map.addLayer(outline, {palette: 'FF0000'}, 'AOI', 
  false);

// Camadas explicativas ----------------------------------------------------
var palettes = require('users/gena/packages:palettes'); // outras palhetas de cores https://github.com/gee-community/ee-palettes

// Solos -------------------------------
// Geologia
var geo_associacoes_meta_psamitico_meta_pelitico = ee.Image("users/huezersperandio/bandas/geo_associacoes_meta_psamitico_meta_pelitico").clip(aoi).rename('geo_associacoes_meta_psamitico_meta_pelitico');
var geo_associacoes_metapeliticas_a_metapsamitica = ee.Image("users/huezersperandio/bandas/geo_associacoes_metapeliticas_a_metapsamitica").clip(aoi).rename('geo_associacoes_metapeliticas_a_metapsamitica');
var geo_formacao_ferrifera_bandada_bifs = ee.Image("users/huezersperandio/bandas/geo_formacao_ferrifera_bandada_bifs").clip(aoi).rename('geo_formacao_ferrifera_bandada_bifs');
var geo_rochas_igneas_composicao_felsica = ee.Image("users/huezersperandio/bandas/geo_rochas_igneas_composicao_felsica").clip(aoi).rename('geo_rochas_igneas_composicao_felsica');
var geo_rochas_meta_carbonaticas = ee.Image("users/huezersperandio/bandas/geo_rochas_meta_carbonaticas").clip(aoi).rename('geo_rochas_meta_carbonaticas');
var geo_rochas_meta_maficas_a_ultramaficas = ee.Image("users/huezersperandio/bandas/geo_rochas_meta_maficas_a_ultramaficas").clip(aoi).rename('geo_rochas_meta_maficas_a_ultramaficas');
var geo_rochas_metamorficas_com_xistosidade = ee.Image("users/huezersperandio/bandas/geo_rochas_metamorficas_com_xistosidade").clip(aoi).rename('geo_rochas_metamorficas_com_xistosidade');
var geo_rochas_metamorficas_de_composicao_felsica = ee.Image("users/huezersperandio/bandas/geo_rochas_metamorficas_de_composicao_felsica").clip(aoi).rename('geo_rochas_metamorficas_de_composicao_felsica');
var geo_rochas_metamorficas_de_composicao_mafica = ee.Image("users/huezersperandio/bandas/geo_rochas_metamorficas_de_composicao_mafica").clip(aoi).rename('geo_rochas_metamorficas_de_composicao_mafica');
var geo_rochas_metapsamiticas = ee.Image("users/huezersperandio/bandas/geo_rochas_metapsamiticas").clip(aoi).rename('geo_rochas_metapsamiticas');
var geo_sedimentos_inconsolidados_cobertura_detrito_lateritica = ee.Image("users/huezersperandio/bandas/geo_sedimentos_inconsolidados_cobertura_detrito_lateritica").clip(aoi).rename('geo_sedimentos_inconsolidados_cobertura_detrito_lateritica');


// Argila
var clay = ee.Image("OpenLandMap/SOL/SOL_CLAY-WFRACTION_USDA-3A1A1A_M/v02").select('b0', 'b10', 'b30','b60','b100', 'b200').clip(aoi).rename('clay0', 'clay10', 'clay30','clay60', 'clay100', 'clay200');

// Capacidade do solo
var bulk = ee.Image("OpenLandMap/SOL/SOL_BULKDENS-FINEEARTH_USDA-4A1H_M/v02").select('b0', 'b10', 'b30','b60','b100', 'b200').clip(aoi).rename('bulk0', 'bulk10', 'bulk30','bulk60', 'bulk100', 'bulk200');

// Materia orgânica solo
var organic = ee.Image("OpenLandMap/SOL/SOL_ORGANIC-CARBON_USDA-6A1C_M/v02").select('b0', 'b10', 'b30','b60','b100', 'b200').clip(aoi).rename('organic0', 'organic10', 'organic30','organic60', 'organic100', 'organic200');

// Textura do solo  
var soilText = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02").select('b0', 'b10', 'b30', 'b60','b100', 'b200').clip(aoi).rename('soilText0', 'soilText10', 'soilText30', 'soilText60', 'soilText100', 'soilText200');

// Amplitude da temperatura da superfície
var tempSurface = ee.Image("OpenLandMap/CLM/CLM_LST_MOD11A2-DAYNIGHT_M/v01").select('jul').clip(aoi).rename('tempSurfacejul');

// Agua Disponivel no solo
var agua_disponivel = ee.Image("users/huezersperandio/bandas/agua_disponivel").clip(aoi).rename('agua_disponivel');
var aguadisponivel_0_5cm = ee.Image("users/huezersperandio/bandas/aguadisponivel_0_5cm").clip(aoi).rename('aguadisponivel_0_5cm');
var aguadisponivel_100_200cm = ee.Image("users/huezersperandio/bandas/aguadisponivel_100_200cm").clip(aoi).rename('aguadisponivel_100_200cm');
var aguadisponivel_30_60cm = ee.Image("users/huezersperandio/bandas/aguadisponivel_30_60cm").clip(aoi).rename('aguadisponivel_30_60cm');
var aguadisponivel_5_15cm = ee.Image("users/huezersperandio/bandas/aguadisponivel_5_15cm").clip(aoi).rename('aguadisponivel_5_15cm');
var aguadisponivel_60_100cm = ee.Image("users/huezersperandio/bandas/aguadisponivel_60_100cm").clip(aoi).rename('aguadisponivel_60_100cm');

// Solos
var solos_afloramento = ee.Image("users/huezersperandio/bandas/solos_afloramento").clip(aoi).rename('solos_afloramento');
var solos_argissoloamarelo = ee.Image("users/huezersperandio/bandas/solos_argissoloamarelo").clip(aoi).rename('solos_argissoloamarelo');
var solos_argissolovermelho = ee.Image("users/huezersperandio/bandas/solos_argissolovermelho").clip(aoi).rename('solos_argissolovermelho');
var solos_argissolovermelhoamarelo = ee.Image("users/huezersperandio/bandas/solos_argissolovermelhoamarelo").clip(aoi).rename('solos_argissolovermelhoamarelo');
var solos_cambissolo = ee.Image("users/huezersperandio/bandas/solos_cambissolo").clip(aoi).rename('solos_cambissolo');
var solos_chernossolo = ee.Image("users/huezersperandio/bandas/solos_chernossolo").clip(aoi).rename('solos_chernossolo');
var solos_espodossolo = ee.Image("users/huezersperandio/bandas/solos_espodossolo").clip(aoi).rename('solos_espodossolo');
var solos_gleissolo = ee.Image("users/huezersperandio/bandas/solos_gleissolo").clip(aoi).rename('solos_gleissolo');
var solos_latossoloamarelo = ee.Image("users/huezersperandio/bandas/solos_latossoloamarelo").clip(aoi).rename('solos_latossoloamarelo');
var solos_latossolovermelho = ee.Image("users/huezersperandio/bandas/solos_latossolovermelho").clip(aoi).rename('solos_latossolovermelho');
var solos_latossolovermelhoamarelo = ee.Image("users/huezersperandio/bandas/solos_latossolovermelhoamarelo").clip(aoi).rename('solos_latossolovermelhoamarelo');
var solos_neossolo = ee.Image("users/huezersperandio/bandas/solos_neossolo").clip(aoi).rename('solos_neossolo');
var solos_neossoloquartzarenico = ee.Image("users/huezersperandio/bandas/solos_neossoloquartzarenico").clip(aoi).rename('solos_neossoloquartzarenico');
var solos_nitossolo = ee.Image("users/huezersperandio/bandas/solos_nitossolo").clip(aoi).rename('solos_nitossolo');
var solos_planossolo = ee.Image("users/huezersperandio/bandas/solos_planossolo").clip(aoi).rename('solos_planossolo');
var solos_plintossolo = ee.Image("users/huezersperandio/bandas/solos_plintossolo").clip(aoi).rename('solos_plintossolo');
var solos_vertissolo = ee.Image("users/huezersperandio/bandas/solos_vertissolo").clip(aoi).rename('solos_vertissolo');

// Relevo -------------
var TAGEE = require('users/joselucassafanelli/TAGEE:TAGEE-functions');
var srtm = ee.Image("USGS/SRTMGL1_003").clip(aoi);
var DEMAttributes = TAGEE.terrainAnalysis(TAGEE, srtm, aoi);

// Clima ----------
var clima = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(aoi))
  .median();
clima = clima.select('def', 'pdsi', 'vs', 'vpd', 'vap', 'aet', 'pet', 'srad').clip(aoi);


// Bioclimaticas
var WC2_amplit_term_anual = ee.Image("users/huezersperandio/bandas/WC2_amplit_term_anual").clip(aoi).rename('WC2_amplit_term_anual');
var WC2_isotermalidade = ee.Image("users/huezersperandio/bandas/WC2_isotermalidade").clip(aoi).rename('WC2_isotermalidade');
var WC2_osc_term_dia = ee.Image("users/huezersperandio/bandas/WC2_osc_term_dia").clip(aoi).rename('WC2_osc_term_dia');
var WC2_prec_anual = ee.Image("users/huezersperandio/bandas/WC2_prec_anual").clip(aoi).rename('WC2_prec_anual');
var WC2_prec_mesmaisseco = ee.Image("users/huezersperandio/bandas/WC2_prec_mesmaisseco").clip(aoi).rename('WC2_prec_mesmaisseco');
var WC2_prec_mesmaisumido = ee.Image("users/huezersperandio/bandas/WC2_prec_mesmaisumido").clip(aoi).rename('WC2_prec_mesmaisumido');
var WC2_prec_trimaisfrio = ee.Image("users/huezersperandio/bandas/WC2_prec_trimaisfrio").clip(aoi).rename('WC2_prec_trimaisfrio');
var WC2_prec_trimaisquente = ee.Image("users/huezersperandio/bandas/WC2_prec_trimaisquente").clip(aoi).rename('WC2_prec_trimaisquente');
var WC2_prec_trimaisseco = ee.Image("users/huezersperandio/bandas/WC2_prec_trimaisseco").clip(aoi).rename('WC2_prec_trimaisseco');
var WC2_prec_trimaisumido = ee.Image("users/huezersperandio/bandas/WC2_prec_trimaisumido").clip(aoi).rename('WC2_prec_trimaisumido');
var WC2_sazo_pre = ee.Image("users/huezersperandio/bandas/WC2_sazo_pre").clip(aoi).rename('WC2_sazo_pre');
var WC2_sazo_temp = ee.Image("users/huezersperandio/bandas/WC2_sazo_temp").clip(aoi).rename('WC2_sazo_temp');
var WC2_temp_ed_trimaisseco = ee.Image("users/huezersperandio/bandas/WC2_temp_ed_trimaisseco").clip(aoi).rename('WC2_temp_ed_trimaisseco');
var WC2_temp_max_mesmaisquent = ee.Image("users/huezersperandio/bandas/WC2_temp_max_mesmaisquent").clip(aoi).rename('WC2_temp_max_mesmaisquent');
var WC2_temp_med_anual = ee.Image("users/huezersperandio/bandas/WC2_temp_med_anual").clip(aoi).rename('WC2_temp_med_anual');
var WC2_temp_med_trimaisfrio = ee.Image("users/huezersperandio/bandas/WC2_temp_med_trimaisfrio").clip(aoi).rename('WC2_temp_med_trimaisfrio');
var WC2_temp_med_trimaisquente = ee.Image("users/huezersperandio/bandas/WC2_temp_med_trimaisquente").clip(aoi).rename('WC2_temp_med_trimaisquente');
var WC2_temp_med_trimaisumido = ee.Image("users/huezersperandio/bandas/WC2_temp_med_trimaisumido").clip(aoi).rename('WC2_temp_med_trimaisumido');
var WC2_temp_min_mesmaisfrio = ee.Image("users/huezersperandio/bandas/WC2_temp_min_mesmaisfrio").clip(aoi).rename('WC2_temp_min_mesmaisfrio');

// Koppen
var kop_am = ee.Image("users/huezersperandio/bandas/kop_am").clip(aoi).rename('kop_am');
var kop_as = ee.Image("users/huezersperandio/bandas/kop_as").clip(aoi).rename('kop_as');
var kop_aw = ee.Image("users/huezersperandio/bandas/kop_aw").clip(aoi).rename('kop_aw');
var kop_cfa = ee.Image("users/huezersperandio/bandas/kop_cfa").clip(aoi).rename('kop_cfa');
var kop_cfb = ee.Image("users/huezersperandio/bandas/kop_cfb").clip(aoi).rename('kop_cfb');
var kop_cwa = ee.Image("users/huezersperandio/bandas/kop_cwa").clip(aoi).rename('kop_cwa');
var kop_cwb = ee.Image("users/huezersperandio/bandas/kop_cwb").clip(aoi).rename('kop_cwb');

// Drenagem -----------------

// Hand
var hand = ee.Image("users/gena/GlobalHAND/30m/hand-1000").clip(aoi).rename('hand');

// Concentrção de nascentes
var concent_nascentes = ee.Image("users/huezersperandio/bandas/concent_nascentes").clip(aoi).rename('concent_nascentes');

// Antropicas -------------------

// Estradas
var distan_rod_fed = ee.Image("users/huezersperandio/bandas/distan_rod_fed").clip(aoi).rename('distan_rod_fed');
var distan_rod_est = ee.Image("users/huezersperandio/bandas/distan_rod_est").clip(aoi).rename('distan_rod_est');
var distan_rod_mun = ee.Image("users/huezersperandio/bandas/distan_rod_mun").clip(aoi).rename('distan_rod_mun');

// Vegetação ----------------------------------

// Potential Heigh
var Potential_Heigh = ee.Image("users/huezersperandio/bandas/Potential_Heigh").clip(aoi).rename('Potential_Heigh');

// MapBiomas
var mp_agricultura = ee.Image("users/huezersperandio/bandas/mp_agricultura").clip(aoi).rename('mp_agricultura');
var mp_agro = ee.Image("users/huezersperandio/bandas/mp_agro").clip(aoi).rename('mp_agro');
var mp_floresta = ee.Image("users/huezersperandio/bandas/mp_floresta").clip(aoi).rename('mp_floresta');
var mp_mos_agri_past = ee.Image("users/huezersperandio/bandas/mp_mos_agri_past").clip(aoi).rename('mp_mos_agri_past');
var mp_nat_naoflorestal = ee.Image("users/huezersperandio/bandas/mp_nat_naoflorestal").clip(aoi).rename('mp_nat_naoflorestal');
var mp_pastagem = ee.Image("users/huezersperandio/bandas/mp_pastagem").clip(aoi).rename('mp_pastagem');
var mp_silvicultura = ee.Image("users/huezersperandio/bandas/mp_silvicultura").clip(aoi).rename('mp_silvicultura');
var mp_vegnativa = ee.Image("users/huezersperandio/bandas/mp_vegnativa").clip(aoi).rename('mp_vegnativa');

// Criar stack das camadas -------------------------------------------------- 
var layersExplanatory = DEMAttributes;
layersExplanatory = layersExplanatory.addBands(clay);
layersExplanatory = layersExplanatory.addBands(bulk);
layersExplanatory = layersExplanatory.addBands(organic);
layersExplanatory = layersExplanatory.addBands(soilText);
layersExplanatory = layersExplanatory.addBands(tempSurface);
layersExplanatory = layersExplanatory.addBands(clima);
layersExplanatory = layersExplanatory.addBands(WC2_amplit_term_anual);
layersExplanatory = layersExplanatory.addBands(WC2_isotermalidade);
layersExplanatory = layersExplanatory.addBands(WC2_osc_term_dia);
layersExplanatory = layersExplanatory.addBands(WC2_prec_anual);
layersExplanatory = layersExplanatory.addBands(WC2_prec_mesmaisseco);
layersExplanatory = layersExplanatory.addBands(WC2_prec_mesmaisumido);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisfrio);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisquente);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisseco);
layersExplanatory = layersExplanatory.addBands(WC2_prec_trimaisumido);
layersExplanatory = layersExplanatory.addBands(WC2_sazo_pre);
layersExplanatory = layersExplanatory.addBands(WC2_sazo_temp);
layersExplanatory = layersExplanatory.addBands(WC2_temp_ed_trimaisseco);
layersExplanatory = layersExplanatory.addBands(WC2_temp_max_mesmaisquent);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_anual);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_trimaisfrio);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_trimaisquente);
layersExplanatory = layersExplanatory.addBands(WC2_temp_med_trimaisumido);
layersExplanatory = layersExplanatory.addBands(WC2_temp_min_mesmaisfrio);
layersExplanatory = layersExplanatory.addBands(hand);
layersExplanatory = layersExplanatory.addBands(Potential_Heigh);
layersExplanatory = layersExplanatory.addBands(distan_rod_mun);
layersExplanatory = layersExplanatory.addBands(distan_rod_est);
layersExplanatory = layersExplanatory.addBands(distan_rod_fed);
layersExplanatory = layersExplanatory.addBands(mp_agricultura);
layersExplanatory = layersExplanatory.addBands(mp_agro);
layersExplanatory = layersExplanatory.addBands(mp_floresta);
layersExplanatory = layersExplanatory.addBands(mp_mos_agri_past);
layersExplanatory = layersExplanatory.addBands(mp_nat_naoflorestal);
layersExplanatory = layersExplanatory.addBands(mp_pastagem);
layersExplanatory = layersExplanatory.addBands(mp_silvicultura);
layersExplanatory = layersExplanatory.addBands(mp_vegnativa);
layersExplanatory = layersExplanatory.addBands(agua_disponivel);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_0_5cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_100_200cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_30_60cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_5_15cm);
layersExplanatory = layersExplanatory.addBands(aguadisponivel_60_100cm);
layersExplanatory = layersExplanatory.addBands(concent_nascentes);
layersExplanatory = layersExplanatory.addBands(kop_am);
layersExplanatory = layersExplanatory.addBands(kop_as);
layersExplanatory = layersExplanatory.addBands(kop_aw);
layersExplanatory = layersExplanatory.addBands(kop_cfa);
layersExplanatory = layersExplanatory.addBands(kop_cwa);
layersExplanatory = layersExplanatory.addBands(kop_cwb);
layersExplanatory = layersExplanatory.addBands(kop_cfb);
layersExplanatory = layersExplanatory.addBands(solos_afloramento);
layersExplanatory = layersExplanatory.addBands(solos_argissoloamarelo);
layersExplanatory = layersExplanatory.addBands(solos_argissolovermelho);
layersExplanatory = layersExplanatory.addBands(solos_argissolovermelhoamarelo);
layersExplanatory = layersExplanatory.addBands(solos_cambissolo);
layersExplanatory = layersExplanatory.addBands(solos_chernossolo);
layersExplanatory = layersExplanatory.addBands(solos_espodossolo);
layersExplanatory = layersExplanatory.addBands(solos_gleissolo);
layersExplanatory = layersExplanatory.addBands(solos_latossoloamarelo);
layersExplanatory = layersExplanatory.addBands(solos_latossolovermelho);
layersExplanatory = layersExplanatory.addBands(solos_latossolovermelhoamarelo);
layersExplanatory = layersExplanatory.addBands(solos_neossolo);
layersExplanatory = layersExplanatory.addBands(solos_neossoloquartzarenico);
layersExplanatory = layersExplanatory.addBands(solos_nitossolo);
layersExplanatory = layersExplanatory.addBands(solos_planossolo);
layersExplanatory = layersExplanatory.addBands(solos_plintossolo);
layersExplanatory = layersExplanatory.addBands(solos_vertissolo);
layersExplanatory = layersExplanatory.addBands(concent_nascentes);
layersExplanatory = layersExplanatory.addBands(geo_sedimentos_inconsolidados_cobertura_detrito_lateritica);
layersExplanatory = layersExplanatory.addBands(geo_rochas_metapsamiticas);
layersExplanatory = layersExplanatory.addBands(geo_rochas_metamorficas_de_composicao_mafica); 
layersExplanatory = layersExplanatory.addBands(geo_rochas_metamorficas_de_composicao_felsica); 
layersExplanatory = layersExplanatory.addBands(geo_rochas_metamorficas_com_xistosidade);
layersExplanatory = layersExplanatory.addBands(geo_rochas_meta_maficas_a_ultramaficas);
layersExplanatory = layersExplanatory.addBands(geo_rochas_meta_carbonaticas);
layersExplanatory = layersExplanatory.addBands(geo_rochas_igneas_composicao_felsica);
layersExplanatory = layersExplanatory.addBands(geo_formacao_ferrifera_bandada_bifs);
layersExplanatory = layersExplanatory.addBands(geo_associacoes_meta_psamitico_meta_pelitico);
layersExplanatory = layersExplanatory.addBands(geo_associacoes_metapeliticas_a_metapsamitica);

//print(layersExplanatory.bandNames()); //para conferir o cubo
Map.addLayer(layersExplanatory.select('clay0'), 
  {min: 30, max: 43}, 
  'Clay0', 
  false);

// Cria camada com as amostras de treinamento -------------------------------
var referencias = ee.FeatureCollection("users/huezersperandio/ptosRef/pontos_aptidao");
print(referencias);
//print(referencias); //para conferir as parcelas usadas como referência
Map.addLayer(referencias,{},'Amostras', false);

var bandas = ['Slope', 'geo_sedimentos_inconsolidados_cobertura_detrito_lateritica',
              'geo_rochas_metapsamiticas', 'geo_rochas_metamorficas_de_composicao_mafica',
              'geo_rochas_metamorficas_de_composicao_felsica', 'geo_rochas_metamorficas_com_xistosidade', 
              'geo_rochas_meta_maficas_a_ultramaficas', 'geo_rochas_meta_carbonaticas', 
              'geo_rochas_igneas_composicao_felsica', 'geo_formacao_ferrifera_bandada_bifs', 
              'geo_associacoes_meta_psamitico_meta_pelitico', 'geo_associacoes_metapeliticas_a_metapsamitica', 
              'solos_afloramento', 'solos_argissoloamarelo', 
              'solos_argissolovermelho', 'solos_argissolovermelhoamarelo', 'solos_cambissolo',
              'solos_chernossolo','solos_espodossolo','solos_gleissolo', 'solos_latossoloamarelo',
              'solos_latossolovermelho', 'solos_latossolovermelhoamarelo', 'solos_neossolo', 'solos_neossoloquartzarenico',
              'solos_nitossolo', 'solos_planossolo','solos_plintossolo', 'solos_vertissolo'];
//var bandas = ['Elevation', 'Slope', 'Aspect', 'Hillshade', 'Northness', 'Eastness',
//              'HorizontalCurvature', 'VerticalCurvature','MeanCurvature',
//              'GaussianCurvature', 'MinimalCurvature','MaximalCurvature',
//              'clay0', 'clay10', 'clay30','clay60', 'clay100', 'clay200',
//              'bulk0', 'bulk10', 'bulk30','bulk60', 'bulk100', 'bulk200', 
//              'organic0', 'organic10', 'organic30','organic60', 'organic100', 
//              'organic200', 'soilText0', 'soilText10', 'soilText30', 'soilText60', 
//              'soilText100', 'soilText200','def','pdsi', 'vs', 'vpd','vap','aet',
//              'pet', 'srad', 'WC2_amplit_term_anual',
//              'WC2_isotermalidade','WC2_osc_term_dia','WC2_prec_anual',
//              'WC2_prec_mesmaisseco', 'WC2_prec_mesmaisumido','WC2_prec_trimaisfrio',
//              'WC2_prec_trimaisquente','WC2_prec_trimaisseco','WC2_prec_trimaisumido',
//              'WC2_sazo_pre','WC2_sazo_temp','WC2_temp_ed_trimaisseco',
//              'WC2_temp_max_mesmaisquent', 'WC2_temp_med_anual','WC2_temp_med_trimaisfrio',
//              'WC2_temp_med_trimaisquente', 'WC2_temp_med_trimaisumido',
//              'WC2_temp_min_mesmaisfrio', 'tempSurfacejul', 'hand', 'Potential_Heigh', 'agua_disponivel',
//              'aguadisponivel_0_5cm', 'aguadisponivel_100_200cm', 'aguadisponivel_30_60cm',
//              'aguadisponivel_5_15cm', 'aguadisponivel_60_100cm', 'mp_agricultura', 
//              'mp_agro', 'mp_floresta','mp_mos_agri_past', 'mp_nat_naoflorestal', 'mp_pastagem',
//              'mp_silvicultura', 'mp_vegnativa','distan_rod_est', 'distan_rod_fed', 
//              'distan_rod_mun', 'solos_afloramento', 'solos_argissoloamarelo', 
//              'solos_argissolovermelho', 'solos_argissolovermelhoamarelo', 'solos_cambissolo',
//              'solos_chernossolo','solos_espodossolo','solos_gleissolo', 'solos_latossoloamarelo',
//              'solos_latossolovermelho', 'solos_latossolovermelhoamarelo', 'solos_neossolo', 'solos_neossoloquartzarenico',
//              'solos_nitossolo', 'solos_planossolo','solos_plintossolo', 'solos_vertissolo', 
//              'kop_am', 'kop_as', 'kop_aw', 'kop_cfa', 'kop_cwa', 'kop_cwb', 'kop_cfb', 
//              'geo_sedimentos_inconsolidados_cobertura_detrito_lateritica',
//              'geo_rochas_metapsamiticas', 'geo_rochas_metamorficas_de_composicao_mafica',
//              'geo_rochas_metamorficas_de_composicao_felsica', 'geo_rochas_metamorficas_com_xistosidade', 
//              'geo_rochas_meta_maficas_a_ultramaficas', 'geo_rochas_meta_carbonaticas', 
//              'geo_rochas_igneas_composicao_felsica', 'geo_formacao_ferrifera_bandada_bifs', 
//              'geo_associacoes_meta_psamitico_meta_pelitico', 'geo_associacoes_metapeliticas_a_metapsamitica'];
              
// une o cubo com os valores de referência parfa projetos agrícolas de grande porte
var treinamento = layersExplanatory.select(bandas).sampleRegions({
  collection:referencias,
  properties:['gr_silv'], //seleciona coluna com valores 0 ou 1 para treinamento
  scale: 10
});
print(treinamento);

// treinamento de uma randomForest baseado no potencial para projeto agrícolas grandes considerando camadas do cubo
var classificador = ee.Classifier.smileRandomForest(10).train({
  features: treinamento,
  classProperty: 'gr_silv',
  inputProperties: bandas
});

// aplicar o classificador para projetos agrícolas de grande pornto na área de estudo
var classificacao = layersExplanatory.select(bandas).classify(classificador);
Map.addLayer(classificacao.clip(aoi),
  {min:0, max:1, palette:['red', 'green']},
  'Classificação', 
  true);

var kernel = ee.Kernel.circle({radius: 1});
var classificacaoComFiltro = classificacao.focalMin({kernel: kernel, iterations: 5}).focalMax({kernel: kernel, iterations: 3});
Map.addLayer(classificacaoComFiltro.clip(aoi),
 {min:0, max:1, palette:['red', 'green']},
 'ClassFinal');