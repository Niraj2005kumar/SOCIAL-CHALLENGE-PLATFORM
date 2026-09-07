import React, { useState, useEffect } from 'react';
import {
  Send,
  UploadCloud,
  Mic,
  MicOff,
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  ThumbsUp,
  MessageSquare,
  AlertTriangle,
  FileText,
  Image,
  Trash2,
  HelpCircle,
  PhoneCall,
  Volume2
} from 'lucide-react';
import { JHARKHAND_DISTRICTS, MOCK_CHALLENGES } from '../../data/mockData';

export default function CitizenDashboard({ showToast }) {
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'my-challenges'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ranchi');
  const [selectedBlock, setSelectedBlock] = useState('Angara');
  const [village, setVillage] = useState('');
  const [category, setCategory] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [submissions, setSubmissions] = useState([
    {
      id: 'CH-CIT-01',
      title: 'High Fluoride in Angara village handpump borewells',
      district: 'Ranchi',
      block: 'Angara',
      village: 'Hesal',
      category: 'Clean Water & Sanitation',
      priority: 'Critical',
      status: 'Assigned to BIT Mesra',
      stage: 3,
      date: '2026-08-28',
      upvotes: 248,
      comments: 34,
    },
    {
      id: 'CH-CIT-02',
      title: 'Broken culvert bridge cutting off 3 schools during monsoon',
      district: 'Gumla',
      block: 'Bishunpur',
      village: 'Banari',
      category: 'Rural Infrastructure',
      priority: 'High',
      status: 'Field Validated by Admin',
      stage: 2,
      date: '2026-08-30',
      upvotes: 182,
      comments: 19,
    },
    {
      id: 'CH-CIT-03',
      title: 'Lack of solar refrigeration for lac & honey storage',
      district: 'Khunti',
      block: 'Murhu',
      village: 'Torpa',
      category: 'Agritech & Forest Produce',
      priority: 'Medium',
      status: 'Submitted / AI Triaged',
      stage: 1,
      date: '2026-09-02',
      upvotes: 94,
      comments: 8,
    }
  ]);

  // Voice recording timer simulation
  useEffect(() => {
    let timer;
    if (isRecordingVoice) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingVoice]);

  // Find blocks for current district
  const currentDistrictObj = JHARKHAND_DISTRICTS.find((d) => d.id === selectedDistrict) || JHARKHAND_DISTRICTS[0];

  // Dynamic AI Triage based on user input
  const getAiTriage = () => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('water') || text.includes('fluoride') || text.includes('arsenic') || text.includes('borewell') || text.includes('filter')) {
      return {
        category: 'Clean Water & Sanitation',
        priority: 'Critical',
        department: 'Drinking Water & Sanitation Dept (DWSD)',
        confidence: '96%',
        tags: ['Water Filtration', 'Fluoride Hazard', 'Geo-Hydrology', 'NIT/BIT Environmental Eng']
      };
    }
    if (text.includes('road') || text.includes('bridge') || text.includes('culvert') || text.includes('pothole') || text.includes('traffic')) {
      return {
        category: 'Rural Infrastructure & Connectivity',
        priority: 'High',
        department: 'Rural Development & Road Construction Dept',
        confidence: '93%',
        tags: ['Pavement Engineering', 'Monsoon Drainage', 'IIT ISM Dhanbad Civil Eng']
      };
    }
    if (text.includes('solar') || text.includes('light') || text.includes('power') || text.includes('grid') || text.includes('electricity')) {
      return {
        category: 'Renewable Energy & Microgrids',
        priority: 'High',
        department: 'Jharkhand Renewable Energy Development Agency (JREDA)',
        confidence: '95%',
        tags: ['Solar PV', 'Battery Storage', 'Decentralized Microgrid']
      };
    }
    if (text.includes('crop') || text.includes('forest') || text.includes('lac') || text.includes('honey') || text.includes('agriculture')) {
      return {
        category: 'Agritech & Tribal Forest Economy',
        priority: 'Medium',
        department: 'Dept of Agriculture, Animal Husbandry & Co-operative',
        confidence: '91%',
        tags: ['Cold Storage', 'Tribal Value Addition', 'Birsa Agricultural Univ (BAU)']
      };
    }
    return {
      category: category || 'General Civic Need',
      priority: 'Medium',
      department: 'Dept of Higher & Technical Education',
      confidence: '84%',
      tags: ['Civic Innovation', 'Multi-disciplinary Match']
    };
  };

  const aiTriage = getAiTriage();

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setUploadedPhotos((prev) => [...prev, ...newUrls]);
      showToast?.(`${files.length} photo(s) attached successfully`, 'success');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast?.('Please provide both title and description for your challenge', 'warning');
      return;
    }

    const newSub = {
      id: `CH-CIT-0${submissions.length + 1}`,
      title: title.trim(),
      district: currentDistrictObj.name,
      block: selectedBlock,
      village: village.trim() || 'Central Hamlet',
      category: aiTriage.category,
      priority: aiTriage.priority,
      status: 'Submitted / AI Triaged',
      stage: 1,
      date: new Date().toISOString().split('T')[0],
      upvotes: 1,
      comments: 0,
    };

    setSubmissions([newSub, ...submissions]);
    showToast?.('Challenge submitted to Government & University portal!', 'success');

    // Reset form
    setTitle('');
    setDescription('');
    setVillage('');
    setUploadedPhotos([]);
    setHasVoiceNote(false);
    setActiveTab('my-challenges');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('submit')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'submit' ? 'var(--role-citizen)' : 'var(--bg-card)',
              color: activeTab === 'submit' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Send size={15} />
            <span>Submit a Challenge</span>
          </button>

          <button
            onClick={() => setActiveTab('my-challenges')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'my-challenges' ? 'var(--role-citizen)' : 'var(--bg-card)',
              color: activeTab === 'my-challenges' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FileText size={15} />
            <span>My Submissions ({submissions.length})</span>
          </button>
        </div>

        {/* Helpline Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            padding: '6px 14px',
            borderRadius: '999px',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          <PhoneCall size={14} style={{ color: 'var(--role-citizen)' }} />
          <span>Jharkhand Citizen Helpline: <strong>181</strong> (Toll-Free)</span>
        </div>
      </div>

      {/* TAB 1: SUBMIT CHALLENGE FORM */}
      {activeTab === 'submit' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
            gap: '24px',
          }}
          className="submit-challenge-grid"
        >
          {/* Main Form Container */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                Tell us about the problem
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                Your voice can lead to real technological and governance change.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Title Field */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Drinking water fluoride contamination in our village"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    color: 'var(--text-primary)',
                    fontSize: '13.5px',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)',
                  }}
                  required
                />
              </div>

              {/* Description Field */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Description *
                  </label>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {description.length}/1000
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder="Describe the problem in detail: when did it start, how many hamlets or families are affected, and what has been tried so far..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-canvas)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  required
                />
              </div>

              {/* Cascading Location Pickers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {/* District */}
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    District *
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      const dist = JHARKHAND_DISTRICTS.find((d) => d.id === e.target.value);
                      if (dist && dist.blocks.length > 0) {
                        setSelectedBlock(dist.blocks[0]);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                    }}
                  >
                    {JHARKHAND_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Block */}
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Block *
                  </label>
                  <select
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                    }}
                  >
                    {currentDistrictObj.blocks.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Village / Ward */}
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Village / Ward *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hesal / Ward 4"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                    }}
                  />
                </div>
              </div>

              {/* Add Evidence Section */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Add Evidence
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {/* Photo Upload Zone */}
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1.5px dashed var(--border-strong)',
                      backgroundColor: 'var(--bg-subtle)',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                    className="hover-lift"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                    <UploadCloud size={22} style={{ color: 'var(--text-muted)', marginBottom: '6px' }} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Upload Photos
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      JPG, PNG up to 5MB
                    </span>
                  </label>

                  {/* Voice Recording Button with Live Audio Wave Visualizer */}
                  <div
                    onClick={() => {
                      if (!isRecordingVoice) {
                        setIsRecordingVoice(true);
                        showToast?.('Recording started... Speak in Hindi, Santhali, Mundari, or English', 'info');
                      } else {
                        setIsRecordingVoice(false);
                        setHasVoiceNote(true);
                        showToast?.(`Voice note (${recordingSeconds}s) attached!`, 'success');
                      }
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                      borderRadius: '10px',
                      border: isRecordingVoice ? '1.5px solid #EF4444' : '1.5px dashed var(--role-citizen)',
                      backgroundColor: isRecordingVoice ? '#FEF2F2' : 'var(--role-citizen-subtle)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                    className="hover-lift"
                  >
                    {isRecordingVoice ? (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px', marginBottom: '4px' }}>
                          {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                            <span
                              key={bar}
                              style={{
                                width: '3px',
                                backgroundColor: '#EF4444',
                                borderRadius: '2px',
                                animation: `wave-bar-anim ${0.4 + bar * 0.1}s ease-in-out infinite alternate`,
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#EF4444' }}>
                          Recording... 0:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                        </span>
                        <span style={{ fontSize: '10px', color: '#991B1B', marginTop: '2px' }}>
                          Click to Stop & Save
                        </span>
                      </>
                    ) : (
                      <>
                        <Mic size={22} style={{ color: 'var(--role-citizen)', marginBottom: '6px' }} />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {hasVoiceNote ? 'Voice Note Attached ✓' : 'Record Voice Note'}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {hasVoiceNote ? 'Click to re-record' : 'Up to 2 minutes in regional dialect'}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Uploaded Photos Thumbnails Preview */}
                {uploadedPhotos.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {uploadedPhotos.map((url, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <img src={url} alt="Proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx))}
                          style={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '16px',
                            height: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Analysis Preview Note (Updates dynamically as user types!) */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-subtle)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--primary)' }}>
                      AI Analysis (Preview)
                    </span>
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                        padding: '1px 6px',
                        borderRadius: '999px',
                      }}
                    >
                      BETA
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Auto-Triage Active ({aiTriage.confidence})
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 10px', lineHeight: 1.4 }}>
                  Our AI analyzes your submission in real time to categorize the issue, assign severity, and route to the appropriate university research team and government department.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                    📁 Category: <strong>{aiTriage.category}</strong>
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: aiTriage.priority === 'Critical' ? '#EF4444' : '#F59E0B', border: '1px solid var(--border-subtle)' }}>
                    ⚡ Priority: <strong>{aiTriage.priority}</strong>
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                    🏛️ {aiTriage.department}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => showToast?.('Draft saved locally in your browser cache', 'info')}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-strong)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                  className="hover-lift"
                >
                  Save Draft
                </button>

                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--role-citizen)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  }}
                  className="hover-lift"
                >
                  <span>Submit Challenge</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* "Your Voice Builds a Better Jharkhand" Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '16px',
                padding: '22px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                Your Voice Builds a Better Jharkhand
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
                Every verified challenge is reviewed directly by Dept. of Higher Education officers and submitted to engineering faculty at BIT Mesra, IIT ISM Dhanbad, and NIT Jamshedpur for thesis & CSR-funded prototyping.
              </p>

              {/* 4 Guarantees */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--role-citizen)' }} />
                  <span>Official tracking number issued within 30 seconds</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--role-citizen)' }} />
                  <span>District Collector review within 48 business hours</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--role-citizen)' }} />
                  <span>SMS & WhatsApp status alerts to your registered mobile</span>
                </div>
              </div>
            </div>

            {/* Quick Stat Summary */}
            <div
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Ranchi District Activity
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-card)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--role-citizen)' }}>142</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Open Issues</div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-card)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>89</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Resolved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY SUBMISSIONS TRACKER */}
      {activeTab === 'my-challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {submissions.map((sub) => (
            <div
              key={sub.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '16px',
                padding: '20px 24px',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
              className="hover-lift"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-muted)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {sub.id}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: sub.priority === 'Critical' ? '#EF4444' : '#F59E0B',
                        backgroundColor: sub.priority === 'Critical' ? '#FEF2F2' : '#FFFBEB',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {sub.priority} Priority
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      • Submitted on {sub.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {sub.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <MapPin size={13} />
                    <span>{sub.village}, {sub.block} Block, {sub.district} District</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setSubmissions(submissions.map((s) => s.id === sub.id ? { ...s, upvotes: s.upvotes + 1 } : s));
                      showToast?.('Thank you for supporting this grassroots challenge!', 'success');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    className="hover-lift"
                  >
                    <ThumbsUp size={14} style={{ color: 'var(--role-citizen)' }} />
                    <span>{sub.upvotes} Upvotes</span>
                  </button>
                </div>
              </div>

              {/* 5-Step Lifecycle Progression Stepper */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '8px',
                  padding: '14px 0 6px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {[
                  { step: 1, name: 'Submitted' },
                  { step: 2, name: 'Field Validated' },
                  { step: 3, name: 'Assigned to BIT/NIT' },
                  { step: 4, name: 'R&D Prototype' },
                  { step: 5, name: 'Solution Deployed' },
                ].map((s) => {
                  const isDone = sub.stage >= s.step;
                  const isCurrent = sub.stage === s.step;
                  return (
                    <div key={s.step} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          height: '4px',
                          borderRadius: '999px',
                          backgroundColor: isDone ? 'var(--role-citizen)' : 'var(--border-subtle)',
                          marginBottom: '6px',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: isCurrent ? 800 : 500,
                          color: isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                        }}
                      >
                        {s.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
