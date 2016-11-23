/*globals svgEditor */
svgEditor.readLang({
	lang: "ro",
	dir : "ltr",
	common: {
		"ok": "Ok",
		"cancel": "Anulaţi",
		"key_backspace": "backspace", 
		"key_del": "ştergere", 
		"key_down": "jos", 
		"key_up": "sus", 
		"more_opts": "Mai multe opţiuni",
		"url": "URL",
		"width": "Lăţime",
		"height": "Înălţime"
	},
	misc: {
		"powered_by": "Powered by"
	}, 
	ui: {
		"toggle_stroke_tools": "Arătaţi/ascundeţi mai multe unelte de contur",
		"palette_info": "Faceţi clic pentru a schimba culoarea de umplere, Shift-clic pentru a schimba culoarea de contur",
		"zoom_level": "Schimbarea nivelului de zoom",
		"panel_drag": "Trageţi la stanga/dreapta pentru redimensionare panou lateral"
	},
	properties: {
		"id": "Identificare element",
		"fill_color": "Schimbarea culorii de umplere",
		"stroke_color": "Schimbarea culorii de contur",
		"stroke_style": "Schimbarea stilului de contur",
		"stroke_width": "Schimbarea lăţimii conturului",
		"pos_x": "Schimbă coordonata X",
		"pos_y": "Schimbă coordonata Y",
		"linecap_butt": "Capăt de linie: Butuc",
		"linecap_round": "Capăt de linie: Rotund",
		"linecap_square": "Capăt de linie: Pătrat",
		"linejoin_bevel": "Articulaţia liniei: Teşită",
		"linejoin_miter": "Articulaţia liniei: Unghi ascuţit",
		"linejoin_round": "Articulaţia liniei: Rotundă",
		"angle": "Schimbarea unghiul de rotaţie",
		"blur": "Schimbarea valorii estomparii gaussiene",
		"opacity": "Schimbarea gradului de opacitate",
		"circle_cx": "Schimbarea coordonatei CX a cercului",
		"circle_cy": "Schimbarea coordonatei CY a cercului",
		"circle_r": "Schimbarea razei cercului",
		"ellipse_cx": "Schimbarea coordonatei CX a elipsei",
		"ellipse_cy": "Schimbarea coordonatei CY a elipsei",
		"ellipse_rx": "Schimbarea razei elipsei X",
		"ellipse_ry": "Schimbarea razei elipsei Y",
		"line_x1": "Schimbarea coordonatei x a punctului de start",
		"line_x2": "Schimbarea coordonatei x a punctului final",
		"line_y1": "Schimbarea coordonatei y a punctului de start",
		"line_y2": "Schimbare coordonatei y a punctului final",
		"rect_height": "Schimbarea înălţimii dreptunghiului",
		"rect_width": "Schimbarea lăţimii dreptunghiului",
		"corner_radius": "Schimbarea razei colţului dreptunghiului",
		"image_width": "Schimbarea lăţimii imaginii",
		"image_height": "Schimbarea înălţimii imaginii",
		"image_url": "Schimbaţi URL-ul",
		"node_x": "Schimbă coordonata x a punctului",
		"node_y": "Schimbă coordonata x a punctului",
		"seg_type": "Schimbă tipul de segment",
		"straight_segments": "Drept",
		"curve_segments": "Curb",
		"text_contents": "Schimbarea conţinutului textului",
		"font_family": "Modificare familie de fonturi",
		"font_size": "Schimbă dimensiunea fontului",
		"bold": "Text Îngroşat",
		"italic": "Text Înclinat"
	},
	tools: { 
		"main_menu": "Menu Principal",
		"bkgnd_color_opac": "Schimbare culoare de fundal / opacitate",
		"connector_no_arrow": "Fără săgeată",
		"fitToContent": "Dimensionare la conţinut",
		"fit_to_all": "Potrivire la tot conţinutul",
		"fit_to_canvas": "Potrivire la Şevalet",
		"fit_to_layer_content": "Potrivire la conţinutul stratului",
		"fit_to_sel": "Potrivire la selecţie",
		"align_relative_to": "Aliniere în raport cu ...",
		"relativeTo": "în raport cu:",
		"page": "pagină",
		"largest_object": "cel mai mare obiect",
		"selected_objects": "obiectele alese",
		"smallest_object": "cel mai mic obiect",
		"new_doc": "Imagine nouă",
		"open_doc": "Imagine deschisă",
		"export_img": "Export",
		"save_doc": "Salvare imagine",
		"import_doc": "Importare SVG",
		"align_to_page": "Aliniere la pagină",
		"align_bottom": "Aliniere jos",
		"align_center": "Aliniere la centru",
		"align_left": "Aliniere la stânga",
		"align_middle": "Aliniere la mijloc",
		"align_right": "Aliniere la dreapta",
		"align_top": "Aliniere sus",
		"mode_select": "Unealtă de Selectare",
		"mode_fhpath": "Unealtă de Traiectorie",
		"mode_line": "Unealtă de Linie",
		"mode_connect": "Conectati doua obiecte",
		"mode_rect": "Unealtă de Dreptunghi",
		"mode_square": "Unealtă de Pătrat",
		"mode_fhrect": "Dreptunghi cu mana liberă",
		"mode_ellipse": "Elipsă",
		"mode_circle": "Cerc",
		"mode_fhellipse": "Elipsă cu mana liberă",
		"mode_path": "Unealtă de Traiectorie",
		"mode_shapelib": "Biblioteca de forme",
		"mode_text": "Unealtă de Text",
		"mode_image": "Unealtă de Imagine",
		"mode_zoom": "Unealtă de Zoom",
		"mode_eyedropper": "Unealtă de captura Culoare",
		"no_embed": "NOTE: Aceasta imagine nu poate fi inglobată. Va depinde de aceasta traiectorie pentru a fi prezentată.",
		"undo": "Anulare",
		"redo": "Refacere",
		"tool_source": "Editare Cod Sursă",
		"wireframe_mode": "Mod Schelet",
		"toggle_grid": "Arată/ascunde Caroiaj",
		"clone": "Clonează Elementul/ele",
		"del": "Şterge Elementul/ele",
		"group_elements": "Grupare Elemente",
		"make_link": "Crează (hyper)link",
		"set_link_url": "Setează link URL (lăsaţi liber pentru eliminare)",
		"to_path": "Converteşte in Traiectorie",
		"reorient_path": "Reorientează Traiectoria",
		"ungroup": "Anulare Grupare Elemente",
		"docprops": "Proprietăţile Documentului",
		"imagelib": "Bibliotecă de Imagini",
		"move_bottom": "Mutare în jos",
		"move_top": "Mutare în sus",
		"node_clone": "Clonează Punct",
		"node_delete": "Şterge Punct",
		"node_link": "Uneşte Punctele de Control",
		"add_subpath": "Adăugaţi sub-traiectorie",
		"openclose_path": "Deschide/inchide sub-traiectorie",
		"source_save": "Folosiţi Schimbările",
		"cut": "Tăiere",
		"copy": "Copiere",
		"paste": "Reproducere",
		"paste_in_place": "Reproducere pe loc",
		"delete": "Ştergere",
		"group": "Group",
		"move_front": "Pune in faţa",
		"move_up": "Pune in spate",
		"move_down": "Trimite in faţa",
		"move_back": "Trimite in spate"
	},
	layers: {
		"layer":"Strat",
		"layers": "Straturi",
		"del": "Ştergeţi Strat",
		"move_down": "Mutare Strat în Jos",
		"new": "Strat Nou",
		"rename": "Redenumiţi Stratul",
		"move_up": "Mutare Strat în Sus",
		"dupe": "Duplicaţi Stratul",
		"merge_down": "Fuzionare in jos",
		"merge_all": "Fuzionarea tuturor",
		"move_elems_to": "Mută elemente la:",
		"move_selected": "Mută elementele selectate pe un alt strat"
	},
	config: {
		"image_props": "Proprietăţile Imaginii",
		"doc_title": "Titlul",
		"doc_dims": "Dimensiunile Şevaletului",
		"included_images": "Imaginile Incluse",
		"image_opt_embed": "Includeţi Datele (fişiere locale)",
		"image_opt_ref": "Foloseşte referinţe la fişiere",
		"editor_prefs": "Preferinţele Editorului",
		"icon_size": "Dimensiunile Butoanelor",
		"language": "Limba",
		"background": "Fondul Editorului",
		"editor_img_url": "URL-ul Imaginii",
		"editor_bg_note": "Notă: Fondul nu va fi salvat cu imaginea.",
		"icon_large": "Mari",
		"icon_medium": "Medii",
		"icon_small": "Mici",
		"icon_xlarge": "Foarte Mari",
		"select_predefined": "Selecţii predefinite:",
		"units_and_rulers": "Unitati si Rigle",
		"show_rulers": "Arată Riglele",
		"base_unit": "Unitate de baza:",
		"grid": "Caroiaj",
		"snapping_onoff": "Fixare on/off",
		"snapping_stepsize": "Dimensiunea pasului de fixare:"
	},
	shape_cats: {
		"basic": "De bază",
		"object": "Obiecte",
		"symbol": "Simboluri",
		"arrow": "Săgeti",
		"flowchart": "Schemă Logică",
		"animal": "Animale",
		"game": "Cărti & şah",
		"dialog_balloon": "Baloane de dialog",
		"electronics": "Electronice",
		"math": "Matematică",
		"music": "Muzică",
		"misc": "Diverse",
		"raphael_1": "raphaeljs.com set 1",
		"raphael_2": "raphaeljs.com set 2"
	},
	imagelib: {
		"select_lib": "Selectati o biblioteca de imagini",
		"show_list": "Arătaţi lista bibliotecii",
		"import_single": "Importare unică",
		"import_multi": "Importare multiplă",
		"open": "Deschideţi ca si document nou"
	},
	notification: {
		"invalidAttrValGiven":"Valoarea data nu este validă",
		"noContentToFitTo":"Fara conţinut de referinţă",
		"dupeLayerName":"Deja exista un strat numit asa!",
		"enterUniqueLayerName":"Rog introduceţi un nume unic",
		"enterNewLayerName":"Rog introduceţi un nume pentru strat",
		"layerHasThatName":"Statul deja are acest nume",
		"QmoveElemsToLayer":"Mutaţi elementele selectate pe stratul '%s'?",
		"QwantToClear":"Doriti să ştergeţi desenul?\nAceasta va sterge si posibilitatea de anulare!",
		"QwantToOpen":"Doriti sa deschideţi un nou fişier?\nAceasta va şterge istoricul!",
		"QerrorsRevertToSource":"Sunt erori de parsing in sursa SVG.\nRevenire la sursa SVG orginală?",
		"QignoreSourceChanges":"Ignoraţi schimbarile la sursa SVG?",
		"featNotSupported":"Funcţie neimplementată",
		"enterNewImgURL":"Introduceţi noul URL pentru Imagine",
		"defsFailOnSave": "NOTE: Din cauza unei erori in browserul dv., aceasta imagine poate apare gresit (fara gradiente sau elemente). Însă va apare corect dupa salvare.",
		"loadingImage":"Imaginea se incarcă, va rugam asteptaţi...",
		"saveFromBrowser": "Selectează \"Salvează ca si...\" in browserul dv. pt. a salva aceasta imagine ca si fisier %s.",
		"noteTheseIssues": "De asemenea remarcati urmatoarele probleme: ",
		"unsavedChanges": "Sunt schimbări nesalvate.",
		"enterNewLinkURL": "IntroduAliniere în raport cu ...sceţi noul URL",
		"errorLoadingSVG": "Eroare: Nu se pot încărca datele SVG",
		"URLloadFail": "Nu se poate încărca de la URL",
		"retrieving": "În preluare \"%s\"..."
	},
	confirmSetStorage: {
		message: "By default and where supported, SVG-Edit can store your editor "+
		"preferences and SVG content locally on your machine so you do not "+
		"need to add these back each time you load SVG-Edit. If, for privacy "+
		"reasons, you do not wish to store this information on your machine, "+
		"you can change away from the default option below.",
		storagePrefsAndContent: "Store preferences and SVG content locally",
		storagePrefsOnly: "Only store preferences locally",
		storagePrefs: "Store preferences locally",
		storageNoPrefsOrContent: "Do not store my preferences or SVG content locally",
		storageNoPrefs: "Do not store my preferences locally",
		rememberLabel: "Remember this choice?",
		rememberTooltip: "If you choose to opt out of storage while remembering this choice, the URL will change so as to avoid asking again."
	}
});
