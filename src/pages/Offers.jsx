import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Tag, Copy, CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Offers = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const { setAppliedPromo, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const { data, error } = await supabase
          .from("promo_codes")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });
        if (!error && data) setPromos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPromos();
  }, []);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyNow = (promo) => {
    setAppliedPromo(promo);
    setIsCartOpen(true);
  };

  return (
    <div style={{ padding: "60px 20px", background: "#f8fafc", minHeight: "60vh" }}>
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", color: "#0f172a", marginBottom: "10px" }}>
            AMPLR Health Offers
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
            Apply these codes at checkout to get amazing discounts on your bookings.
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <Loader2 size={32} style={{ color: "var(--brand-primary)", animation: "spin 1s linear infinite" }} />
          </div>
        ) : promos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <Tag size={48} color="#cbd5e1" style={{ marginBottom: "1rem" }} />
            <h3 style={{ color: "#334155" }}>No active offers at the moment</h3>
            <p style={{ color: "#64748b" }}>Please check back later for new discounts!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {promos.map((promo) => (
              <div
                key={promo.id}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    background: promo.is_auto_apply ? "#fef08a" : "var(--brand-primary)",
                    color: promo.is_auto_apply ? "#854d0e" : "white",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "150px",
                  }}
                >
                  <span style={{ fontSize: "2rem", fontWeight: "800" }}>
                    {promo.discount_type === "percentage"
                      ? `${promo.discount_amount}%`
                      : `\u20b9${promo.discount_amount}`}
                  </span>
                  <span style={{ fontSize: "1rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.9 }}>
                    OFF
                  </span>
                </div>

                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px", color: "#0f172a", fontSize: "1.25rem" }}>
                      {promo.is_auto_apply ? "Special Global Discount" : "Health Services Coupon"}
                    </h3>
                    <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
                      {promo.is_auto_apply
                        ? "This discount is automatically applied to all bookings. No code required!"
                        : `Use this code at checkout to save ${promo.discount_type === "percentage" ? `${promo.discount_amount}%` : `\u20b9${promo.discount_amount}`}.`}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
                    <div
                      style={{
                        background: "#f1f5f9",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "1px dashed #94a3b8",
                        fontWeight: "700",
                        color: "#334155",
                        letterSpacing: "1px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {promo.code}
                      <button
                        onClick={() => handleCopy(promo.code, promo.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--brand-primary)", display: "flex", alignItems: "center" }}
                        title="Copy Code"
                      >
                        {copiedId === promo.id ? <CheckCircle size={16} color="#16a34a" /> : <Copy size={16} />}
                      </button>
                    </div>

                    {!promo.is_auto_apply && (
                      <button
                        onClick={() => handleApplyNow(promo)}
                        className="btn-primary"
                        style={{ padding: "8px 20px", fontSize: "0.95rem" }}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
