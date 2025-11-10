import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as CloseIcon, Image as ImageIcon, Info as InfoIcon, Loader2 as LoaderIcon } from 'lucide-react';
import './Hero.css';

// URLs de los endpoints de tu API
const API_ENDPOINT_PROJECTS = 'https://portfolio-ddr-backend.onrender.com/api/projects'; 
const API_ENDPOINT_UPLOAD = 'https://portfolio-ddr-backend.onrender.com/api/upload-image';

// ==============================================
// MODAL 2: About Modal (Modal 'Acerca de')
// ==============================================
const AboutModal = ({ onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
        <motion.div 
            className="modal-content about-modal" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
        >
            <button className="modal-close-btn" onClick={onClose}><CloseIcon size={24} /></button>
            <h4>About This Site Manager</h4>
            <p>
                This application serves as a dynamic showcase for my favorite web projects and sites, managed completely through a custom full-stack architecture.
            </p>

            <h5>Technology Stack</h5>
            <ul>
                <li><strong>Frontend:</strong> React (with Vite or Create React App)</li>
                <li><strong>Styling:</strong> CSS Modules / Tailwind CSS (as necessary)</li>
                <li><strong>Backend:</strong> Node.js / Express (Hosted on Render)</li>
                <li><strong>Database:</strong> PostgreSQL (Neon Serverless)</li>
                <li><strong>Image Storage:</strong> Cloudinary (for secure and efficient image hosting).</li> {/* 👈 NUEVO ITEM */}
                <li><strong>Tools:</strong> Framer Motion for animations, Lucide React for icons.</li>
            </ul>

            <h5>Instructions for Use</h5>
            <ul>
                <li>Use the <strong>"Add Site"</strong> button to insert a new project into the Neon database.</li>
                <li>The list below will update automatically when a new site is added.</li>
                <li>**Image Upload:** If you select a file, it will now be uploaded automatically to **Cloudinary** via the Node.js server before being saved to the database.</li>
            </ul>

            <footer>© 2025 Diego Da Rocha — Portfolio Manager Demo</footer>
        </motion.div>
    </div>
);


// ==============================================
// MODAL 1: Site Addition Form (Formulario para Añadir Sitio)
// ==============================================
// Recibe onClose Y onProjectsRefresh como props
const AddSiteModal = ({ onClose, onProjectsRefresh }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link_url: '',
        image_url: '', // Contiene la URL final (si es 'url') o el nombre del archivo (si es 'file')
    });
    const [imageFile, setImageFile] = useState(null); 
    const [imageSourceType, setImageSourceType] = useState('url'); // 'url' or 'file'
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // Handler for file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Solo aceptamos imágenes por debajo de 5MB
            if (file.size > 5 * 1024 * 1024) { 
                setMessage('Error: File size exceeds 5MB limit.');
                setImageFile(null);
                setFormData(prev => ({ ...prev, image_url: '' })); 
                return;
            }
            setMessage('');
            setImageFile(file);
            // Mostrar nombre del archivo en el input
            setFormData(prev => ({ ...prev, image_url: file.name })); 
        } else {
             setImageFile(null);
             setFormData(prev => ({ ...prev, image_url: '' })); 
        }
    };

    // Toggles between URL input and File input
    const toggleSourceType = () => {
        setImageSourceType(prev => prev === 'url' ? 'file' : 'url');
        setFormData(prev => ({ ...prev, image_url: '' })); 
        setImageFile(null);
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Validaciones
        let finalImageUrl = formData.image_url;
        if (!formData.title || !formData.description || !formData.link_url) {
            setMessage('All fields are required.');
            return;
        }

        if (imageSourceType === 'file' && !imageFile) {
            setMessage('Please select an image file or switch to URL input.');
            return;
        }

        setIsLoading(true);
        setMessage('Processing...');
        
        try {
            // PASO A: Subir imagen si es un archivo local
            if (imageSourceType === 'file') {
                setMessage('Uploading image to Cloudinary...');
                
                const uploadFormData = new FormData();
                // El nombre de campo debe coincidir con el de Multer en server.js ('imageFile')
                uploadFormData.append('imageFile', imageFile);

                const uploadResponse = await fetch(API_ENDPOINT_UPLOAD, {
                    method: 'POST',
                    // No necesita Content-Type, FormData lo establece automáticamente con boundary
                    body: uploadFormData, 
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.error || 'Failed to upload image to Cloudinary.');
                }
                
                const uploadResult = await uploadResponse.json();
                finalImageUrl = uploadResult.imageUrl; // Esta es la URL pública de Cloudinary
            }
            
            // Si es URL, ya tenemos finalImageUrl de formData.image_url
            
            // PASO B: Guardar el proyecto con la URL final
            setMessage('Saving project URL to database...');
            
            const dataToSend = {
                title: formData.title,
                description: formData.description,
                link_url: formData.link_url,
                image_url: finalImageUrl
            };
            
            const saveResponse = await fetch(API_ENDPOINT_PROJECTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!saveResponse.ok) {
                const errorData = await saveResponse.json();
                throw new Error(errorData.error || `HTTP Error ${saveResponse.status}. Failed to save project.`);
            }

            // Éxito:
            setMessage('Site added successfully! Updating list...');
            
            // 🚨 LÓGICA DE RECARGA Y CIERRE AUTOMÁTICO
            // 1. Llama a la función que fuerza la recarga del componente Projects (en App.js)
            onProjectsRefresh(); 
            
            // 2. Cierra el modal después de un pequeño retraso para mostrar el mensaje de éxito
            setTimeout(() => {
                onClose();
            }, 1000);
            
        } catch (error) {
            console.error('Error in submission process:', error);
            setMessage(`Failed to complete action: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div 
                className="modal-content form-modal" 
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <button className="modal-close-btn" onClick={onClose}><CloseIcon size={24} /></button>
                <h3>Add New Site to the List</h3>
                
                <form onSubmit={handleSubmit}>
                    <label>Site Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />

                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />

                    <label>Site URL (Link):</label>
                    <input type="url" name="link_url" value={formData.link_url} onChange={handleChange} required />

                    <label>Snapshot Image Source:</label>
                    <div className="image-input-group">
                        {imageSourceType === 'url' ? (
                             <input 
                                type="url" 
                                name="image_url" 
                                placeholder="Paste Image URL (e.g., https://example.com/image.png)"
                                value={formData.image_url} 
                                onChange={handleChange} 
                                required 
                            />
                        ) : (
                            // File input type displayed when 'file' is selected
                            <>
                                <input 
                                    type="text" 
                                    name="image_placeholder" 
                                    placeholder={imageFile ? imageFile.name : "No file selected (Max 5MB)"}
                                    value={formData.image_url} 
                                    readOnly 
                                    required
                                />
                                <label className="cta-button tertiary-btn file-input-label">
                                    <ImageIcon size={18} /> Browse...
                                    <input 
                                        type="file" 
                                        name="image_file" 
                                        accept="image/*"
                                        onChange={handleFileChange} 
                                        style={{ display: 'none' }} // Hide the actual file input
                                        required={imageSourceType === 'file'}
                                    />
                                </label>
                            </>
                        )}
                        <button 
                            type="button" 
                            className="toggle-button" 
                            onClick={toggleSourceType}
                            title={imageSourceType === 'url' ? 'Switch to selecting a local file (Automatic Cloudinary Upload)' : 'Switch to pasting a URL'}
                        >
                            {imageSourceType === 'url' ? 'Use Local File' : 'Use URL'}
                        </button>
                    </div>

                    {message && <p className={`form-message ${message.includes('success') ? 'success' : (message.includes('Error') || message.includes('Failed') ? 'error' : 'warning')}`}>{message}</p>}

                    <button type="submit" className="cta-button modal-submit-btn" disabled={isLoading}>
                        {isLoading ? (<LoaderIcon size={24} className="spin-loader" />) : 'Add Site'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};


// ==============================================
// MAIN COMPONENT: Hero
// ==============================================
// Recibe onProjectsRefresh como prop
function Hero({ onProjectsRefresh }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);

    return (
        <section className="hero">
            <motion.h2 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }}
            >
                This is a List of my Favorite Sites 😁
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 1 }}
            >
                Do <strong>YOU</strong> Like <strong>IT?</strong>
            </motion.p>
            
            <div className="hero-actions">
                <motion.a 
                    href="mailto:ddarocha@jdnservice.com" 
                    className="cta-button"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Get in Touch ME
                </motion.a>

                <motion.button 
                    onClick={() => setShowAddModal(true)}
                    className="cta-button secondary-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <strong>Add Site</strong>
                </motion.button>

                <motion.button 
                    onClick={() => setShowAboutModal(true)}
                    className="cta-button secondary-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <InfoIcon size={18} style={{marginRight: '5px'}}/> About
                </motion.button>
            </div>
            
            <AnimatePresence>
                {showAddModal && (
                    <AddSiteModal 
                        onClose={() => setShowAddModal(false)} 
                        onProjectsRefresh={onProjectsRefresh} // 👈 Pasamos la función de recarga
                    />
                )}
                {showAboutModal && (
                    <AboutModal 
                        onClose={() => setShowAboutModal(false)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}

export default Hero;
