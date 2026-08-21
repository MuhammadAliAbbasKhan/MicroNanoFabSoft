import React, { useState } from 'react';
import { X, CreditCard, CheckCircle2, Lock } from 'lucide-react';
import { createStripePaymentIntent, processSubscription } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const CheckoutModal = ({ isOpen, onClose, selectedPlan, currentUser, setCurrentUser }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [cardNumber] = useState('4242 •••• •••• 4242');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const { addToast } = useToast();

  if (!isOpen) return null;

  const tier = selectedPlan || 'standard';
  const priceMap = { basic: 149, standard: 499, premium: 999 };
  let basePrice = priceMap[tier] || 499;
  if (billingCycle === 'yearly') basePrice = Math.round(basePrice * 0.8);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = currentUser?.email || 'customer@institution.edu';
      const intentRes = await createStripePaymentIntent({ email, plan_tier: tier, billing_cycle: billingCycle });
      
      if (intentRes.status === 'success') {
        const subRes = await processSubscription({
          email,
          plan_tier: tier,
          billing_cycle: billingCycle,
          stripe_payment_intent_id: intentRes.payment_intent_id
        });

        if (subRes.status === 'success') {
          if (currentUser) {
            setCurrentUser({ ...currentUser, plan_tier: tier });
          }
          setSuccessMsg(subRes.message);
          addToast(subRes.message, 'success');
        }
      }
    } catch (err) {
      addToast('Payment authorization failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-fadeIn">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
          <X className="w-5 h-5" />
        </button>

        {successMsg ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900">Software License Activated!</h3>
            <p className="text-xs text-slate-600 mt-2">{successMsg}</p>
            <button 
              onClick={onClose}
              className="mt-6 bg-[#0066b2] text-white font-bold px-6 py-2 rounded-full text-xs"
            >
              Close Checkout
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-6 h-6 text-[#0066b2]" />
              <h3 className="text-xl font-bold text-slate-900">MicroNanoFabSoft Checkout</h3>
            </div>

            {/* Plan Summary Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">SELECTED LICENSE TIER</span>
                <h4 className="text-lg font-bold text-slate-900 capitalize">{tier} Litho Suite</h4>
                <p className="text-xs text-slate-500">Includes BEAMER PEC, LAB 3D, TRACER & ProSEM.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#0066b2]">${basePrice}</span>
                <span className="text-xs text-slate-500 block">/month</span>
              </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex justify-center bg-slate-100 p-1 rounded-lg mb-6 text-xs font-semibold">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${billingCycle === 'monthly' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
              >
                Monthly Billing
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${billingCycle === 'yearly' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
              >
                Yearly Billing (20% OFF)
              </button>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Credit Card Number</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    readOnly 
                    value={cardNumber}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry</label>
                  <input type="text" readOnly value="12 / 28" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700 font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CVC</label>
                  <input type="text" readOnly value="888" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-700 font-mono" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#23b14d] hover:bg-[#1e9942] text-white font-bold py-3 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? 'Processing Transaction...' : `Confirm & Pay $${basePrice}`}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
