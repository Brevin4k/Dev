import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { extractInstagramHandle, importInstagramFromUrl } from '../utils/instagramImporter';
import {
  X,
  Lock,
  Upload,
  Image as ImageIcon,
  Video,
  Trash2,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Instagram,
  RefreshCw,
  DownloadCloud,
  Sparkles,
  Link as LinkIcon,
  Zap
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    houses,
    addHouse,
    deleteHouse,
    videoConfig,
    updateVideoConfig,
    changeAdminPassword,
    instagramConfig,
    updateInstagramConfig,
    addInstagramPost,
    deleteInstagramPost,
    setFullInstagramConfig
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'fotos' | 'instagram' | 'video' | 'senha'>('fotos');

  // URL Auto-Import State
  const [importUrlInput, setImportUrlInput] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New House Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [areaM2, setAreaM2] = useState<number>(180);
  const [category, setCategory] = useState<'mansao' | 'cobertura' | 'corporativo'>('mansao');
  const [scope, setScope] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [houseSuccessMsg, setHouseSuccessMsg] = useState(false);

  // Video Form State
  const [videoUrl, setVideoUrl] = useState(videoConfig.videoUrl);
  const [videoTitle, setVideoTitle] = useState(videoConfig.videoTitle);
  const [videoSubtitle, setVideoSubtitle] = useState(videoConfig.videoSubtitle);
  const [videoSuccessMsg, setVideoSuccessMsg] = useState(false);

  // Instagram Profile State
  const [igHandle, setIgHandle] = useState(instagramConfig.handle);
  const [igName, setIgName] = useState(instagramConfig.profileName);
  const [igBio, setIgBio] = useState(instagramConfig.bio);
  const [igAvatarUrl, setIgAvatarUrl] = useState(instagramConfig.profilePicUrl);
  const [igAvatarPreview, setIgAvatarPreview] = useState(instagramConfig.profilePicUrl);
  const [igFollowers, setIgFollowers] = useState(instagramConfig.followersCount);
  const [igSuccessMsg, setIgSuccessMsg] = useState(false);

  // Widget and Automation State
  const [feedMode, setFeedMode] = useState<'native' | 'widget'>(instagramConfig.feedMode || 'native');
  const [widgetCode, setWidgetCode] = useState(instagramConfig.widgetCode || '');
  const [widgetSuccessMsg, setWidgetSuccessMsg] = useState(false);
  const [batchSuccessCount, setBatchSuccessCount] = useState<number | null>(null);

  // Instagram New Post State
  const [postCaption, setPostCaption] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');
  const [postImagePreview, setPostImagePreview] = useState('');
  const [postLikes, setPostLikes] = useState<number>(180);
  const [postSuccessMsg, setPostSuccessMsg] = useState(false);

  // Password Form State
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ text: string; ok: boolean } | null>(null);

  if (!isOpen) return null;

  // Handle local file upload for houses
  const handleHouseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageUrl(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  // Handle local file upload for Instagram profile avatar
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setIgAvatarUrl(result);
      setIgAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  // Handle local file upload for Instagram Feed Post
  const handlePostFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPostImageUrl(result);
      setPostImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(passwordInput);
    if (!ok) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPasswordInput('');
    }
  };

  const handleAddHouse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const catMap = {
      mansao: 'Mansão de Luxo',
      cobertura: 'Cobertura Penthouse',
      corporativo: 'Corporativo / Sede'
    };

    addHouse({
      title,
      location: location || 'São Paulo - SP',
      areaM2: Number(areaM2) || 120,
      category,
      categoryLabel: catMap[category],
      imageUrl,
      dateCompleted: 'Recente',
      scope: scope || 'Limpeza técnica pós-obra com desincrustação neutra e acabamento cirúrgico.'
    });

    setTitle('');
    setLocation('');
    setScope('');
    setImageUrl('');
    setImagePreview('');
    setHouseSuccessMsg(true);
    setTimeout(() => setHouseSuccessMsg(false), 3000);
  };

  const handleImportFromInstagramUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrlInput.trim()) return;

    setIsImporting(true);
    setImportStatus(null);

    try {
      const result = await importInstagramFromUrl(importUrlInput.trim());

      if (result.success && result.data) {
        const updatedConfig = {
          ...instagramConfig,
          ...result.data,
          posts: result.data.posts || instagramConfig.posts
        };

        setFullInstagramConfig(updatedConfig);

        // Sync local form states
        if (result.data.handle) setIgHandle(result.data.handle);
        if (result.data.profileName) setIgName(result.data.profileName);
        if (result.data.bio) setIgBio(result.data.bio);
        if (result.data.profilePicUrl) {
          setIgAvatarUrl(result.data.profilePicUrl);
          setIgAvatarPreview(result.data.profilePicUrl);
        }
        if (result.data.followersCount) setIgFollowers(result.data.followersCount);

        setImportStatus({
          type: 'success',
          message: `Sucesso! Foto do perfil @${result.data.handle} e ${result.importedPostsCount} publicações foram sincronizadas!`
        });
      } else {
        setImportStatus({
          type: 'error',
          message: result.message || 'Não foi possível importar a partir deste link.'
        });
      }
    } catch {
      setImportStatus({
        type: 'error',
        message: 'Ocorreu um erro ao processar o link. Verifique se o endereço está correto.'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleSaveInstagramProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstagramConfig({
      handle: igHandle.replace(/^@/, '').trim(),
      profileName: igName,
      bio: igBio,
      profilePicUrl: igAvatarUrl,
      followersCount: igFollowers,
      profileUrl: `https://instagram.com/${igHandle.replace(/^@/, '').trim()}`
    });
    setIgSuccessMsg(true);
    setTimeout(() => setIgSuccessMsg(false), 3000);
  };

  const handleAddInstagramPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postImageUrl) return;

    addInstagramPost({
      imageUrl: postImageUrl,
      caption: postCaption || 'Acabamento cirúrgico e transparência óptica absoluta.',
      likes: Number(postLikes) || 120,
      comments: Math.floor(Math.random() * 18) + 4,
      postUrl: `https://instagram.com/${igHandle.replace(/^@/, '').trim()}`,
      date: 'Recente'
    });

    setPostCaption('');
    setPostImageUrl('');
    setPostImagePreview('');
    setPostSuccessMsg(true);
    setTimeout(() => setPostSuccessMsg(false), 3000);
  };

  const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let count = 0;
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          addInstagramPost({
            imageUrl: base64,
            caption: `Entrega técnica JK Vidros · Acabamento cirúrgico de esquadrias e vidros nobres.`,
            likes: Math.floor(Math.random() * 200) + 150,
            comments: Math.floor(Math.random() * 20) + 6,
            postUrl: `https://instagram.com/${igHandle.replace(/^@/, '').trim()}`,
            date: 'Recente'
          });
          count++;
          setBatchSuccessCount(count);
          setTimeout(() => setBatchSuccessCount(null), 4000);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveWidget = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstagramConfig({
      feedMode,
      widgetCode: widgetCode.trim()
    });
    setWidgetSuccessMsg(true);
    setTimeout(() => setWidgetSuccessMsg(false), 3000);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    updateVideoConfig({
      videoUrl,
      videoTitle,
      videoSubtitle
    });
    setVideoSuccessMsg(true);
    setTimeout(() => setVideoSuccessMsg(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = changeAdminPassword(oldPass, newPass);
    if (ok) {
      setPassMsg({ text: 'Senha alterada com sucesso!', ok: true });
      setOldPass('');
      setNewPass('');
    } else {
      setPassMsg({ text: 'Senha atual incorreta ou nova senha muito curta (mínimo 4 dígitos).', ok: false });
    }
    setTimeout(() => setPassMsg(null), 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-300" />
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Painel de Gestão · JK Vidros
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-grow text-left">
          {!isAdminLoggedIn ? (
            /* Login Screen */
            <form onSubmit={handleLogin} className="space-y-4 py-4 max-w-sm mx-auto">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Área Restrita do Administrador</h3>
                <p className="text-xs text-zinc-400">
                  Insira sua senha para gerenciar fotos de obras, Instagram e vídeo.
                </p>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Senha de Acesso:</label>
                <input
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 focus:border-zinc-300 text-xs text-white outline-none"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-1.5 text-rose-400 text-xs bg-rose-950/40 p-2 rounded-lg border border-rose-900/60">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Senha incorreta. Tente novamente.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[44px] rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition"
              >
                Entrar no Painel
              </button>

              <div className="text-center text-[10px] text-zinc-500 pt-2 border-t border-zinc-800/80">
                Senha padrão: <span className="font-mono text-zinc-300">jk2026</span>
              </div>
            </form>
          ) : (
            /* Authenticated Admin Dashboard */
            <div>
              {/* Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-950 rounded-xl mb-4 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('fotos')}
                  className={`min-h-[38px] flex flex-col sm:flex-row items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition ${
                    activeTab === 'fotos'
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="truncate">Obras</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('instagram')}
                  className={`min-h-[38px] flex flex-col sm:flex-row items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition ${
                    activeTab === 'instagram'
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span className="truncate">Instagram</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`min-h-[38px] flex flex-col sm:flex-row items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition ${
                    activeTab === 'video'
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span className="truncate">Vídeo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('senha')}
                  className={`min-h-[38px] flex flex-col sm:flex-row items-center justify-center gap-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition ${
                    activeTab === 'senha'
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span className="truncate">Senha</span>
                </button>
              </div>

              {/* TAB 1: GERENCIAR OBRAS */}
              {activeTab === 'fotos' && (
                <div className="space-y-5">
                  <form onSubmit={handleAddHouse} className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-zinc-300" />
                        Cadastrar Nova Foto de Obra
                      </h4>
                      <span className="text-[10px] text-zinc-400">Publicação imediata</span>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-300 block mb-1">
                        1. Selecionar Foto do Celular / Computador:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHouseFileChange}
                        className="w-full text-xs text-zinc-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Ou insira link de imagem (URL):
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={imageUrl.startsWith('data:') ? '' : imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setImagePreview(e.target.value);
                        }}
                        className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                      />
                    </div>

                    {imagePreview && (
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-zinc-700 bg-black">
                        <img src={imagePreview} alt="Pré-visualização" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 px-1.5 py-0.5 rounded text-zinc-300">
                          Pré-visualização
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Título da Obra:</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Mansão Tamboré 10"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Localização:</label>
                        <input
                          type="text"
                          placeholder="Ex: Alphaville - SP"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Área de Vidro (m²):</label>
                        <input
                          type="number"
                          value={areaM2}
                          onChange={(e) => setAreaM2(Number(e.target.value))}
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Categoria:</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as typeof category)}
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        >
                          <option value="mansao">Mansão de Luxo</option>
                          <option value="cobertura">Cobertura Penthouse</option>
                          <option value="corporativo">Corporativo / Sede</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Escopo Realizado:</label>
                      <input
                        type="text"
                        placeholder="Ex: Descontaminação de cimento e películas residuais."
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                      />
                    </div>

                    {houseSuccessMsg && (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Foto cadastrada e publicada no site!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!imageUrl || !title}
                      className="w-full min-h-[42px] rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition disabled:opacity-50"
                    >
                      Salvar Obra no Portfólio
                    </button>
                  </form>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-2">
                      Obras no Portfólio ({houses.length})
                    </h4>
                    <div className="space-y-2">
                      {houses.map((h) => (
                        <div
                          key={h.id}
                          className="flex items-center justify-between p-2.5 bg-zinc-950/60 border border-zinc-800 rounded-xl"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img
                              src={h.imageUrl}
                              alt={h.title}
                              className="w-12 h-10 object-cover rounded-lg bg-black shrink-0"
                            />
                            <div className="truncate">
                              <span className="text-xs font-semibold text-white block truncate">{h.title}</span>
                              <span className="text-[10px] text-zinc-400 block truncate">{h.location} · {h.areaM2}m²</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteHouse(h.id)}
                            className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg transition shrink-0"
                            title="Remover foto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INSTAGRAM & FEED */}
              {activeTab === 'instagram' && (
                <div className="space-y-5">
                  {/* FEATURE HIGHLIGHT: Importar Todas as Fotos do Instagram pela URL */}
                  <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 rounded-xl border border-zinc-700/80 shadow-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Sincronizar Perfil e Feed pela URL</span>
                      </h4>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                        1-Clique
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Cole o link ou @ do Instagram (ex: <span className="font-mono text-zinc-300">@jk_joaovidros</span> ou <span className="font-mono text-zinc-300">https://instagram.com/jk_joaovidros</span>) para atualizar dados e foto de perfil instantaneamente.
                    </p>

                    <form onSubmit={handleImportFromInstagramUrl} className="space-y-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                          <LinkIcon className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          required
                          value={importUrlInput}
                          onChange={(e) => {
                            setImportUrlInput(e.target.value);
                            if (importStatus) setImportStatus(null);
                          }}
                          placeholder="https://www.instagram.com/jk_joaovidros"
                          className="w-full min-h-[42px] pl-9 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 focus:border-zinc-300 text-xs text-white outline-none"
                        />
                      </div>

                      {importStatus && (
                        <div
                          className={`flex items-start gap-2 p-2.5 rounded-lg text-xs border ${
                            importStatus.type === 'success'
                              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          {importStatus.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                          )}
                          <span className="leading-snug">{importStatus.message}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isImporting || !importUrlInput.trim()}
                        className="w-full min-h-[42px] rounded-lg bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 active:scale-[0.99]"
                      >
                        {isImporting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Sincronizando com @{igHandle}...</span>
                          </>
                        ) : (
                          <>
                            <DownloadCloud className="w-4 h-4" />
                            <span>Sincronizar Perfil e Fotos do Instagram</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* NOVO: ATUALIZAÇÃO 100% AUTOMÁTICA VIA WIDGET OFICIAL */}
                  <form onSubmit={handleSaveWidget} className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Feed 100% Automático ao Vivo (Widget Oficial)</span>
                      </h4>
                      <span className="text-[10px] text-zinc-400">Tempo Real</span>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Como a Meta/Instagram bloqueia que sites externos baixem fotos anônimas sem autorização, para que as fotos do seu cliente <strong className="text-zinc-200">atualizem 100% sozinhas toda vez que ele posta no Instagram</strong>, você pode conectar um widget gratuito oficial (como <strong className="text-zinc-200">Elfsight.com</strong>, <strong className="text-zinc-200">Behold.so</strong> ou <strong className="text-zinc-200">SnapWidget</strong>).
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFeedMode('native')}
                        className={`p-2.5 rounded-lg border text-left transition ${
                          feedMode === 'native'
                            ? 'border-zinc-300 bg-zinc-800 text-white'
                            : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-xs font-bold block">Galeria Nativa</span>
                        <span className="text-[10px] text-zinc-400 block mt-0.5">Ultrarrápida & com zoom</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFeedMode('widget')}
                        className={`p-2.5 rounded-lg border text-left transition ${
                          feedMode === 'widget'
                            ? 'border-amber-400 bg-amber-950/30 text-amber-200'
                            : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-xs font-bold block flex items-center gap-1">
                          <span>Widget ao Vivo</span>
                          <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded">Auto</span>
                        </span>
                        <span className="text-[10px] text-zinc-400 block mt-0.5">Sincroniza sem login</span>
                      </button>
                    </div>

                    {feedMode === 'widget' && (
                      <div className="space-y-2 pt-2 border-t border-zinc-800">
                        <label className="text-[11px] text-zinc-300 block">
                          Cole o Código do Widget (HTML / Iframe / Script):
                        </label>
                        <textarea
                          rows={3}
                          value={widgetCode}
                          onChange={(e) => setWidgetCode(e.target.value)}
                          placeholder="Ex: <div class='elfsight-app-...'></div> ou <iframe src='https://snapwidget.com/...'></iframe>"
                          className="w-full px-2.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 font-mono outline-none"
                        />
                        <span className="text-[10px] text-zinc-500 block">
                          💡 Grátis em: <strong>elfsight.com/instagram-feed-widget</strong> ou <strong>behold.so</strong>
                        </span>
                      </div>
                    )}

                    {widgetSuccessMsg && (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Modo de exibição salvo com sucesso!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full min-h-[38px] rounded-lg bg-zinc-200 hover:bg-white text-zinc-950 font-semibold text-xs transition"
                    >
                      Salvar Modo de Exibição
                    </button>
                  </form>

                  {/* NOVO: UPLOAD RÁPIDO EM LOTE (VÁRIAS FOTOS DO CELULAR DE UMA VEZ) */}
                  <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Upload Rápido em Lote (Galeria do Celular)</span>
                      </h4>
                      <span className="text-[10px] text-zinc-400">Multi-seleção</span>
                    </div>

                    <p className="text-[11px] text-zinc-400">
                      Selecione várias fotos direto da galeria do seu celular ou computador de uma única vez para adicionar ao feed:
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleBatchUpload}
                      className="w-full text-xs text-zinc-400 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                    />

                    {batchSuccessCount !== null && (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{batchSuccessCount} fotos foram adicionadas com sucesso ao Feed!</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Settings */}
                  <form onSubmit={handleSaveInstagramProfile} className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5 text-zinc-300" />
                        Perfil do Instagram
                      </h4>
                      <span className="text-[10px] text-zinc-400">Cartão de Perfil</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-700 bg-black">
                        <img src={igAvatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow text-left">
                        <label className="text-[10px] text-zinc-400 block mb-1">
                          Foto de Perfil (Avatar):
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarFileChange}
                          className="w-full text-[11px] text-zinc-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-zinc-800 file:text-zinc-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Seu @ (Username):</label>
                        <input
                          type="text"
                          required
                          value={igHandle}
                          onChange={(e) => setIgHandle(e.target.value)}
                          placeholder="jkvidros.private"
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Nome de Exibição:</label>
                        <input
                          type="text"
                          value={igName}
                          onChange={(e) => setIgName(e.target.value)}
                          placeholder="JK Vidros Private"
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Nº de Seguidores:</label>
                        <input
                          type="text"
                          value={igFollowers}
                          onChange={(e) => setIgFollowers(e.target.value)}
                          placeholder="14.8k"
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-0.5">Link Direto da Imagem (opcional):</label>
                        <input
                          type="url"
                          value={igAvatarUrl.startsWith('data:') ? '' : igAvatarUrl}
                          onChange={(e) => {
                            setIgAvatarUrl(e.target.value);
                            setIgAvatarPreview(e.target.value);
                          }}
                          placeholder="https://..."
                          className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Biografia do Instagram:</label>
                      <textarea
                        rows={2}
                        value={igBio}
                        onChange={(e) => setIgBio(e.target.value)}
                        placeholder="Limpeza técnica de vidros..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none resize-none"
                      />
                    </div>

                    {igSuccessMsg && (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Perfil do Instagram atualizado!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full min-h-[40px] rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition"
                    >
                      Salvar Dados do Perfil
                    </button>
                  </form>

                  {/* Add New Post to Feed */}
                  <form onSubmit={handleAddInstagramPost} className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-zinc-300" />
                      Adicionar Nova Foto ao Feed
                    </h4>

                    <div>
                      <label className="text-[11px] text-zinc-300 block mb-1">
                        1. Selecionar Foto do Feed (Celular/PC):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePostFileChange}
                        className="w-full text-xs text-zinc-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-zinc-800 file:text-zinc-200"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Ou link de foto na internet:
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={postImageUrl.startsWith('data:') ? '' : postImageUrl}
                        onChange={(e) => {
                          setPostImageUrl(e.target.value);
                          setPostImagePreview(e.target.value);
                        }}
                        className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                      />
                    </div>

                    {postImagePreview && (
                      <div className="relative aspect-square w-28 rounded-lg overflow-hidden border border-zinc-700 bg-black mx-auto">
                        <img src={postImagePreview} alt="Post preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Legenda do Post:</label>
                      <input
                        type="text"
                        placeholder="Ex: Entrega de pós-obra em residência contemporânea."
                        value={postCaption}
                        onChange={(e) => setPostCaption(e.target.value)}
                        className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-0.5">Curtidas Iniciais:</label>
                      <input
                        type="number"
                        value={postLikes}
                        onChange={(e) => setPostLikes(Number(e.target.value))}
                        className="w-full min-h-[38px] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white outline-none"
                      />
                    </div>

                    {postSuccessMsg && (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Foto adicionada ao Feed com sucesso!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!postImageUrl}
                      className="w-full min-h-[40px] rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition disabled:opacity-50"
                    >
                      Publicar Foto no Feed
                    </button>
                  </form>

                  {/* List of current Instagram posts */}
                  <div>
                    <h4 className="text-xs font-bold text-white mb-2">
                      Fotos Atuais do Feed ({instagramConfig.posts.length})
                    </h4>
                    <div className="space-y-2">
                      {instagramConfig.posts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-2 bg-zinc-950/60 border border-zinc-800 rounded-xl"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <img
                              src={post.imageUrl}
                              alt="Post"
                              className="w-10 h-10 object-cover rounded-lg bg-black shrink-0"
                            />
                            <div className="truncate">
                              <span className="text-xs text-white block truncate">{post.caption}</span>
                              <span className="text-[10px] text-zinc-400 block">❤️ {post.likes} curtidas</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteInstagramPost(post.id)}
                            className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg transition shrink-0"
                            title="Remover do feed"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: VÍDEO DE APRESENTAÇÃO */}
              {activeTab === 'video' && (
                <form onSubmit={handleSaveVideo} className="space-y-3.5">
                  <h4 className="text-xs font-bold text-white">
                    Configurar Vídeo de Apresentação (Topo do Site)
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Defina o vídeo que seus clientes assistirão logo ao abrir o site.
                  </p>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Link / URL do Vídeo (formato MP4 ou link direto):
                    </label>
                    <input
                      type="url"
                      required
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Título da Apresentação:
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Apresentação Executiva..."
                      className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">
                      Subtítulo / Descrição Rápida:
                    </label>
                    <textarea
                      rows={2}
                      value={videoSubtitle}
                      onChange={(e) => setVideoSubtitle(e.target.value)}
                      placeholder="Assista em 1 minuto..."
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white outline-none resize-none"
                    />
                  </div>

                  {videoSuccessMsg && (
                    <div className="flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Configurações do vídeo atualizadas!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition"
                  >
                    Salvar Alterações do Vídeo
                  </button>
                </form>
              )}

              {/* TAB 4: ALTERAR SENHA */}
              {activeTab === 'senha' && (
                <form onSubmit={handleChangePassword} className="space-y-3.5">
                  <h4 className="text-xs font-bold text-white">
                    Segurança de Acesso ao Painel
                  </h4>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">Senha Atual:</label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="Digite a senha atual (padrão: jk2026)"
                      className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-300 block mb-1">Nova Senha:</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Digite a nova senha (mínimo 4 caracteres)"
                      className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white outline-none"
                    />
                  </div>

                  {passMsg && (
                    <div
                      className={`flex items-center gap-1.5 text-xs p-2 rounded-lg border ${
                        passMsg.ok
                          ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/60'
                          : 'text-rose-400 bg-rose-950/40 border-rose-900/60'
                      }`}
                    >
                      {passMsg.ok ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                      <span>{passMsg.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition"
                  >
                    Atualizar Senha
                  </button>

                  <div className="pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={logoutAdmin}
                      className="w-full py-2 rounded-lg text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-800 transition"
                    >
                      Sair do Modo Administrador
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
