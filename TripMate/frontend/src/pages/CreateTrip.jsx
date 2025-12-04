import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Plane, Calendar, FileText, CheckCircle, Tag } from "lucide-react";

const CreateTrip = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        destination: "",
        type: "Leisure",
        startDate: "",
        endDate: "",
        budget: "",
        description: "",
        tags: "",
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchTrip = async () => {
                try {
                    const { data } = await api.get(`/trips/${id}`);
                    setFormData({
                        ...data,
                        startDate: data.startDate.split("T")[0],
                        endDate: data.endDate.split("T")[0],
                        tags: data.tags ? data.tags.join(", ") : "",
                    });
                } catch (error) {
                    console.error("Error fetching trip:", error);
                }
            };
            fetchTrip();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
            };

            if (isEditMode) {
                await api.put(`/trips/${id}`, payload);
            } else {
                await api.post("/trips", payload);
            }
            navigate("/");
        } catch (error) {
            console.error("Error saving trip:", error);
        }
    };

    return (
        <>
            {/* ---------- INLINE CSS ----------- */}
            <style>{`
                .trip-bg {
                    min-height: 100vh;
                    background: url("https://i.pinimg.com/1200x/bb/4b/2c/bb4b2cc1c6714f3fa3403c7f71136eea.jpg") center/cover no-repeat;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    position: relative;
                }
                .trip-bg::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(3px);
                }
                .trip-container {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                    text-align: center;
                    animation: fadeIn 0.7s ease;
                }
                .trip-title {
                    font-size: 32px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 25px;
                }
                .trip-steps {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 25px;
                }
                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #ccc;
                }
                .step.active {
                    color: #ffd86b;
                }
                .step-circle {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid #ccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 5px;
                    transition: .3s;
                }
                .step.active .step-circle {
                    border-color: #ffd86b;
                    background: #ffd86b;
                    color: #000;
                }
                .trip-card {
                    background: rgba(255, 255, 255, 0.18);
                    padding: 30px;
                    border-radius: 16px;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.6s ease;
                }
                label {
                    font-weight: 600;
                    margin-bottom: 6px;
                    display: block;
                    color: #fff;
                }
                input, select, textarea {
                    width: 100%;
                    padding: 12px;
                    border-radius: 10px;
                    border: none;
                    background: rgba(255, 255, 255, 0.8);
                    margin-bottom: 15px;
                    font-size: 15px;
                }
                textarea { resize: none; }

                .row { display: flex; gap: 15px; }
                .section-title {
                    font-size: 20px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 18px;
                }
                .summary-box {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 15px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    color: #fff;
                    text-align: left;
                }
                .btn-primary, .btn-secondary, .btn-success {
                    padding: 12px 18px;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    transition: 0.3s;
                }
                .btn-primary {
                    background: #6c63ff;
                    color: #fff;
                }
                .btn-primary:hover { background: #574ee6; }
                .btn-secondary { background: #ffffffb4; }
                .btn-success {
                    background: #00d57b;
                    color: #000;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .btn-success:hover { background: #00bf6f; }

                .btn-right { text-align: right; }
                .btn-between { display: flex; justify-content: space-between; }

                @keyframes fadeIn {
                    from { opacity: 0 }
                    to { opacity: 1 }
                }

                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            {/* ---------- PAGE UI ----------- */}
            <div className="trip-bg">
                <div className="trip-container">

                    <h1 className="trip-title">
                        {isEditMode ? "Edit Trip" : "Plan a New Trip"}
                    </h1>

                    {/* Steps */}
                    <div className="trip-steps">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className={`step ${step >= num ? "active" : ""}`}>
                                <div className="step-circle">{num}</div>
                                <span>
                                    {num === 1 && "Destination"}
                                    {num === 2 && "Details"}
                                    {num === 3 && "Review"}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="trip-card">
                        <form onSubmit={handleSubmit}>

                            {/* STEP 1 */}
                            {step === 1 && (
                                <>
                                    <h2 className="section-title">
                                        <Plane size={20} /> Where are you going?
                                    </h2>

                                    <label>Destination</label>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Paris"
                                    />

                                    <label>Trip Type</label>
                                    <select name="type" value={formData.type} onChange={handleChange}>
                                        <option value="Leisure">Leisure</option>
                                        <option value="Business">Business</option>
                                        <option value="Family">Family</option>
                                        <option value="Adventure">Adventure</option>
                                    </select>

                                    <div className="btn-right">
                                        <button type="button" onClick={nextStep} className="btn-primary">
                                            Next →
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <>
                                    <h2 className="section-title">
                                        <Calendar size={20} /> Dates & Budget
                                    </h2>

                                    <div className="row">
                                        <div>
                                            <label>Start Date</label>
                                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                                        </div>
                                        <div>
                                            <label>End Date</label>
                                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <label>Budget (₹)</label>
                                    <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., 20000"
                                    />

                                    <div className="btn-between">
                                        <button type="button" onClick={prevStep} className="btn-secondary">← Back</button>
                                        <button type="button" onClick={nextStep} className="btn-primary">Next →</button>
                                    </div>
                                </>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <>
                                    <h2 className="section-title">
                                        <FileText size={20} /> Final Details
                                    </h2>

                                    <label><Tag size={16} /> Tags</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="beach, adventure"
                                    />

                                    <label>Description</label>
                                    <textarea
                                        rows="4"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Add notes..."
                                    />

                                    <div className="summary-box">
                                        <h3>Summary:</h3>
                                        <p><b>Destination:</b> {formData.destination}</p>
                                        <p><b>Type:</b> {formData.type}</p>
                                        <p><b>Dates:</b> {formData.startDate} → {formData.endDate}</p>
                                        <p><b>Budget:</b> ₹{formData.budget}</p>
                                    </div>

                                    <div className="btn-between">
                                        <button type="button" onClick={prevStep} className="btn-secondary">
                                            ← Back
                                        </button>
                                        <button type="submit" className="btn-success">
                                            <CheckCircle size={18} /> {isEditMode ? "Update Trip" : "Create Trip"}
                                        </button>
                                    </div>
                                </>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTrip;
