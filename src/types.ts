export interface MedicineOffer {
  id: string;
  pharmacyName: string;
  badge?: string;
  badgeType?: 'govt' | 'verified' | 'rating' | 'error';
  distance: string;
  location: string;
  medicineName: string;
  manufacturer: string;
  categoryDesc: string;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  image: string;
  stockText?: string;
  expiryText: string;
  deliveryType: string;
  deliveryCost?: string;
  coldChain?: boolean;
  complianceLocked?: boolean;
  lockReason?: string;
  rating?: number;
  licenseNumber?: string;
  rphOnDuty?: boolean;
}

export interface DoseScheduleItem {
  id: string;
  period: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  time: string;
  status: 'taken' | 'due' | 'upcoming';
  statusText: string;
  medicineName: string;
  instructions: string;
  dosage: string;
}

export interface CartItem {
  id: string;
  packageId: string;
  name: string;
  salt: string;
  schedule: string;
  manufacturer: string;
  packageQuantity: string;
  price: number;
  mrp: number;
  quantity: number;
  savingsPct: number;
  bioequivalentScore?: string;
  nablTested?: boolean;
  govtRegulated?: boolean;
}

export interface FulfillmentPackage {
  id: string;
  sellerName: string;
  sellerBadge: string;
  distance: string;
  deliverySpeed: string;
  license: string;
  rphLicensed: boolean;
  deliveryFee: number;
  deliveryDiscountNote?: string;
  subtotal: number;
  type: 'express' | 'govt_kendra';
  eta: string;
}

export interface CanonicalMolecule {
  id: string;
  code: string;
  atc: string;
  name: string;
  dosageForm: string;
  category: string;
  schedule: string;
  standardName: string;
  f2Score: number;
  isValidF2: boolean;
  mappedGenericsCount: number;
  priceMin: number;
  priceMax: number;
  maxSavingsPct: number;
  status: 'Verified' | 'Flagged' | 'Under Review';
  formula: string;
  molWeight: string;
  innovatorReference: string;
  innovatorPrice: number;
  dissolutionRate: number;
  aucBioavailability: number;
  stabilityZone: string;
}

export interface PharmacyApplicant {
  id: string;
  name: string;
  location: string;
  gstin: string;
  dlNumber: string;
  dlType: string;
  dlExpiry: string;
  pharmacistName: string;
  pharmacistReg: string;
  pharmacistMatchPct: number;
  riskScore: number;
  riskLevel: 'HIGH' | 'LOW' | 'FAST-TRACK' | 'MED';
  riskDetail: string;
  applicantOwner: string;
  contactMobile: string;
  entityType: string;
  geofenceMismatch?: string;
  flaggedListing?: {
    medicine: string;
    quotedPrice: number;
    benchmarkPrice: number;
    genericFloor: number;
    deviationPct: number;
  };
}

export interface PricingAnomaly {
  id: string;
  caseId: string;
  sellerName: string;
  molecule: string;
  location: string;
  gstin: string;
  quotedPrice: number;
  mrp: number;
  floorPrice: number;
  deviationPct: number;
  anomalyType: 'Dumping' | 'Spoilage Risk' | 'Counterfeit' | 'Bulk Narcotic';
  diagnosticReason: string;
  severity: number;
  declaredBatch: string;
  isLocked: boolean;
}

export interface RxVerificationQueueItem {
  id: string;
  rxNumber: string;
  schedule: 'Schedule H' | 'Schedule H1' | 'Schedule X';
  flagTitle: string;
  flagType: 'error' | 'success';
  medicine: string;
  doctor: string;
  patient: string;
  confidence: number;
  confidenceNote: string;
  timeAgo: string;
  attemptInfo?: string;
  geo?: string;
  status: 'pending' | 'approved' | 'rejected' | 'blocked';
}
