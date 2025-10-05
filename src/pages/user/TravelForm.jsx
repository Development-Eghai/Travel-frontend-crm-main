import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';

const TravelForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        travelerType: '',
        destination: '',
        tripStyle: '',
        startDate: '',
        endDate: '',
        budget: '',
        name: '',
        email: ''
    });
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aiResult, setAiResult] = useState('');
    const [error, setError] = useState(false);
    const [additionalFeatures, setAdditionalFeatures] = useState({
        packingList: '',
        culturalTips: '',
        showPacking: false,
        showTips: false
    });
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        email: false
    });

    const totalSteps = 4;

    const travelerTypes = [
        { value: 'Solo', icon: '👤', label: 'Solo' },
        { value: 'Couple', icon: '💕', label: 'Couple' },
        { value: 'Family', icon: '👨‍👩‍👧‍👦', label: 'Family' },
        { value: 'Friends', icon: '👥', label: 'Friends' }
    ];

    const tripStyles = [
        { value: 'Relaxing', label: 'Relaxing' },
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Cultural', label: 'Cultural' },
        { value: 'Party', label: 'Party' }
    ];

    const budgetRanges = [
        { value: '<1000', label: '$1,000' },
        { value: '1000-2500', label: '$1,000 - $2,500' },
        { value: '2500-5000', label: '$2,500 - $5,000' },
        { value: '>5000', label: '$5,000+' }
    ];

    const handleChoiceSelection = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateProgressBar = () => {
        return ((currentStep + 1) / totalSteps) * 100;
    };

    const generateTripIdeas = async () => {
        setLoading(true);
        setError(false);

        try {
            // Simulate API call - replace with actual API integration
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock AI response - replace with actual AI integration
            const mockResponse = `
                <div class="ai-result-container">
                    <!-- Hero Section -->
                    <div class="hero-section">
                        <div class="hero-icon">
                            <div class="icon-wrapper">
                                <div class="icon-bg"></div>
                                <span class="icon">✈️</span>
                            </div>
                        </div>
                        <h1 class="hero-title">Your Personalized Adventure in ${formData.destination || 'Your Dream Destination'}</h1>
                        <p class="hero-subtitle">
                            Based on your preferences as a <span class="highlight-green">${formData.travelerType}</span> traveler looking for 
                            <span class="highlight-blue">${formData.tripStyle}</span> experiences, here's your perfect 3-day itinerary:
                        </p>
                        <div class="hero-divider"></div>
                    </div>

                    <!-- Itinerary Section -->
                    <div class="itinerary-section">
                        <div class="day-card day-1">
                            <div class="day-header">
                                <div class="day-badge">
                                    <span class="day-number">01</span>
                                </div>
                                <h3 class="day-title">Day 1: Arrival & Exploration</h3>
                            </div>
                            <div class="day-content">
                                <p class="day-description">
                                    Start your journey with a relaxing arrival and gentle exploration of the local area. 
                                    Perfect for getting acclimated to your new surroundings and soaking in the authentic atmosphere.
                                </p>
                                <div class="day-features">
                                    <span class="feature-tag">Airport Transfer</span>
                                    <span class="feature-tag">Local Welcome</span>
                                    <span class="feature-tag">Orientation</span>
                                </div>
                            </div>
                        </div>

                        <div class="day-card day-2">
                            <div class="day-header">
                                <div class="day-badge">
                                    <span class="day-number">02</span>
                                </div>
                                <h3 class="day-title">Day 2: Adventure & Discovery</h3>
                            </div>
                            <div class="day-content">
                                <p class="day-description">
                                    Dive deep into the heart of your destination with exciting activities and cultural experiences 
                                    that match your travel style and create unforgettable moments.
                                </p>
                                <div class="day-features">
                                    <span class="feature-tag">Cultural Tours</span>
                                    <span class="feature-tag">Local Cuisine</span>
                                    <span class="feature-tag">Hidden Gems</span>
                                </div>
                            </div>
                        </div>

                        <div class="day-card day-3">
                            <div class="day-header">
                                <div class="day-badge">
                                    <span class="day-number">03</span>
                                </div>
                                <h3 class="day-title">Day 3: Unforgettable Memories</h3>
                            </div>
                            <div class="day-content">
                                <p class="day-description">
                                    End your journey with memorable experiences and prepare for your next adventure 
                                    with lasting memories that will stay with you forever.
                                </p>
                                <div class="day-features">
                                    <span class="feature-tag">Photo Ops</span>
                                    <span class="feature-tag">Souvenirs</span>
                                    <span class="feature-tag">Farewell</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            setAiResult(mockResponse);
            setShowResult(true);
        } catch (err) {
            console.error("Error generating trip ideas:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset validation errors
        setValidationErrors({ name: false, email: false });

        let hasErrors = false;
        const newErrors = { name: false, email: false };

        // Validate required fields
        if (!formData.name || !formData.name.trim()) {
            newErrors.name = true;
            hasErrors = true;
        }

        if (!formData.email || !formData.email.trim()) {
            newErrors.email = true;
            hasErrors = true;
        } else {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = true;
                hasErrors = true;
            }
        }

        if (hasErrors) {
            setValidationErrors(newErrors);
            console.log('Validation errors:', newErrors);
            return;
        }

        console.log('Submitting form with data:', formData);
        await generateTripIdeas();
    };

    const generatePackingList = async () => {
        setAdditionalFeatures(prev => ({ ...prev, showPacking: true }));
        // Simulate packing list generation
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAdditionalFeatures(prev => ({
            ...prev,
            packingList: `
                <div class="packing-result">
                    <h4 class="text-lg font-semibold text-white mb-3">Your Personalized Packing List</h4>
                    <div class="space-y-3">
                        <div>
                            <h5 class="font-medium text-blue-300">Clothing</h5>
                            <ul class="text-gray-300 text-sm ml-4">
                                <li>• Comfortable walking shoes</li>
                                <li>• Weather-appropriate clothing</li>
                                <li>• Swimwear (if applicable)</li>
                            </ul>
                        </div>
                        <div>
                            <h5 class="font-medium text-blue-300">Documents</h5>
                            <ul class="text-gray-300 text-sm ml-4">
                                <li>• Passport/ID</li>
                                <li>• Travel insurance</li>
                                <li>• Booking confirmations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }));
    };

    const generateCulturalTips = async () => {
        setAdditionalFeatures(prev => ({ ...prev, showTips: true }));
        // Simulate cultural tips generation
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAdditionalFeatures(prev => ({
            ...prev,
            culturalTips: `
                <div class="tips-result">
                    <h4 class="text-lg font-semibold text-white mb-3">Cultural Tips for ${formData.destination || 'Your Destination'}</h4>
                    <div class="space-y-3">
                        <div>
                            <h5 class="font-medium text-purple-300">Greetings</h5>
                            <p class="text-gray-300 text-sm">Learn basic greetings in the local language to show respect.</p>
                        </div>
                        <div>
                            <h5 class="font-medium text-purple-300">Dining Etiquette</h5>
                            <p class="text-gray-300 text-sm">Observe local dining customs and table manners.</p>
                        </div>
                    </div>
                </div>
            `
        }));
    };

    const startOver = () => {
        setCurrentStep(0);
        setFormData({
            travelerType: '',
            destination: '',
            tripStyle: '',
            startDate: '',
            endDate: '',
            budget: '',
            name: '',
            email: ''
        });
        setShowResult(false);
        setAiResult('');
        setError(false);
        setAdditionalFeatures({
            packingList: '',
            culturalTips: '',
            showPacking: false,
            showTips: false
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="form-step active">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Who's joining the adventure?</h2>
                        <p className="text-center text-gray-300 mb-8">This helps us tailor the perfect experience for your group.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {travelerTypes.map((type) => (
                                <div
                                    key={type.value}
                                    className={`choice-card text-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.travelerType === type.value
                                            ? 'border-blue-500 bg-blue-500 bg-opacity-20 scale-105'
                                            : 'border-gray-500 hover:border-blue-400'
                                        }`}
                                    onClick={() => handleChoiceSelection('travelerType', type.value)}
                                >
                                    <div className="text-3xl mb-2">{type.icon}</div>
                                    <span className="font-semibold">{type.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="next-btn bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={nextStep}
                                disabled={!formData.travelerType}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="form-step active">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Where to and what's your vibe?</h2>
                        <p className="text-center text-gray-300 mb-8">Tell us your dream spot and preferred travel style.</p>
                        <div className="mb-6">
                            <label htmlFor="destination" className="block text-sm font-bold mb-2">Dream Destination(s)</label>
                            <input
                                type="text"
                                id="destination"
                                value={formData.destination}
                                onChange={(e) => handleInputChange('destination', e.target.value)}
                                className="form-input w-full p-3 bg-gray-700 border-2 border-gray-500 rounded-lg transition-colors focus:outline-none focus:border-blue-500 focus:shadow-lg"
                                placeholder="e.g., Bali, Indonesia or Paris, France"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2">What kind of trip are you looking for?</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {tripStyles.map((style) => (
                                    <div
                                        key={style.value}
                                        className={`choice-card text-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.tripStyle === style.value
                                                ? 'border-blue-500 bg-blue-500 bg-opacity-20 scale-105'
                                                : 'border-gray-500 hover:border-blue-400'
                                            }`}
                                        onClick={() => handleChoiceSelection('tripStyle', style.value)}
                                    >
                                        {style.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="prev-btn bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={prevStep}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="next-btn bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={nextStep}
                                disabled={!formData.tripStyle}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="form-step active">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">When and how much?</h2>
                        <p className="text-center text-gray-300 mb-8">Flexible dates and budget help us find the best deals.</p>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-bold mb-2">Approx. Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={formData.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                    className="form-input w-full p-3 bg-gray-700 border-2 border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 focus:shadow-lg"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-bold mb-2">Approx. End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={formData.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                                    className="form-input w-full p-3 bg-gray-700 border-2 border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 focus:shadow-lg"
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2">Approximate budget per person (USD)</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {budgetRanges.map((budget) => (
                                    <div
                                        key={budget.value}
                                        className={`choice-card text-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${formData.budget === budget.value
                                                ? 'border-blue-500 bg-blue-500 bg-opacity-20 scale-105'
                                                : 'border-gray-500 hover:border-blue-400'
                                            }`}
                                        onClick={() => handleChoiceSelection('budget', budget.value)}
                                    >
                                        {budget.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="prev-btn bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={prevStep}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="next-btn bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={nextStep}
                                disabled={!formData.budget}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="form-step active">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Almost there!</h2>
                        <p className="text-center text-gray-300 mb-8">Let's generate your personalized trip ideas.</p>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`form-input w-full p-3 bg-gray-700 border-2 rounded-lg focus:outline-none focus:shadow-lg ${validationErrors.name
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-gray-500 focus:border-blue-500'
                                        }`}
                                    placeholder="John Doe"
                                    required
                                />
                                {validationErrors.name && (
                                    <p className="text-red-400 text-sm mt-1">Please enter your full name</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`form-input w-full p-3 bg-gray-700 border-2 rounded-lg focus:outline-none focus:shadow-lg ${validationErrors.email
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-gray-500 focus:border-blue-500'
                                        }`}
                                    placeholder="you@example.com"
                                    required
                                />
                                {validationErrors.email && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {!formData.email ? 'Please enter your email address' : 'Please enter a valid email address'}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                className="prev-btn bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={prevStep}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                className="bg-green-600 text-white font-semibold py-2.5 px-8 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center disabled:opacity-50 transform hover:scale-102"
                                onClick={handleSubmit}
                                disabled={!formData.name || !formData.email || loading}
                                style={{
                                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    fontSize: '0.875rem',
                                    letterSpacing: '0.025em'
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div className="mini-loader mr-2"></div>
                                        <span className="text-sm">Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2 text-base">✨</span>
                                        <span className="text-sm">Generate Trip Ideas</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (showResult) {
        return (
            <div className="travel-form-container">
                <div className="relative min-h-screen flex flex-col items-center p-4 py-8">
                    <div className="glass-container rounded-2xl shadow-2xl w-full max-w-4xl p-8 md:p-12">
                        {loading && (
                            <div className="text-center">
                                <div className="loader mx-auto mb-4"></div>
                                <h2 className="text-2xl font-bold text-white mb-2">Crafting your adventure...</h2>
                                <p className="text-gray-300">Our AI is curating the perfect trip based on your choices. Please wait a moment.</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center">
                                <div className="text-red-400 text-6xl mb-4">⚠️</div>
                                <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong.</h2>
                                <p className="text-gray-300 mb-6">We couldn't generate your trip ideas right now. Please try again later.</p>
                            </div>
                        )}

                        {!loading && !error && aiResult && (
                            <div className="ai-result-container">
                                <div dangerouslySetInnerHTML={{ __html: aiResult }} />

                                <div className="additional-features">
                                    <div className="features-header">
                                        <h3 className="features-title">Enhance Your Journey</h3>
                                        <p className="features-subtitle">Get personalized insights to make your trip extraordinary</p>
                                    </div>

                                    <div className="features-grid">
                                        <button
                                            onClick={generatePackingList}
                                            disabled={additionalFeatures.showPacking}
                                            className="feature-card packing-card"
                                        >
                                            <div className="feature-icon">
                                                <span className="icon">🧳</span>
                                            </div>
                                            <div className="feature-content">
                                                <h4 className="feature-title">Smart Packing List</h4>
                                                <p className="feature-description">Get a personalized packing list based on your destination and travel style</p>
                                            </div>
                                            {additionalFeatures.showPacking && <div className="feature-loader"></div>}
                                        </button>

                                        <button
                                            onClick={generateCulturalTips}
                                            disabled={additionalFeatures.showTips}
                                            className="feature-card tips-card"
                                        >
                                            <div className="feature-icon">
                                                <span className="icon">🌍</span>
                                            </div>
                                            <div className="feature-content">
                                                <h4 className="feature-title">Cultural Insights</h4>
                                                <p className="feature-description">Learn local customs, etiquette, and cultural tips for your destination</p>
                                            </div>
                                            {additionalFeatures.showTips && <div className="feature-loader"></div>}
                                        </button>
                                    </div>

                                    {additionalFeatures.packingList && (
                                        <div className="packing-result mt-4 p-4 bg-black bg-opacity-20 rounded-lg" dangerouslySetInnerHTML={{ __html: additionalFeatures.packingList }} />
                                    )}

                                    {additionalFeatures.culturalTips && (
                                        <div className="tips-result mt-4 p-4 bg-black bg-opacity-20 rounded-lg" dangerouslySetInnerHTML={{ __html: additionalFeatures.culturalTips }} />
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="action-section">
                            <button
                                onClick={startOver}
                                className="start-over-btn"
                            >
                                <span className="btn-icon">🔄</span>
                                <span className="btn-text">Start New Journey</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="travel-form-container">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
                    alt="A beautiful lake surrounded by mountains, representing travel and adventure."
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
                <div className="glass-container rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${updateProgressBar()}%` }}
                            ></div>
                        </div>
                        <div className="text-center text-sm text-gray-300 mt-2">
                            Step {currentStep + 1} of {totalSteps}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {renderStep()}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TravelForm; 