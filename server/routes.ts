import type { Express } from "express";
import { createServer, type Server } from "http";
import { 
  agTopupPackages, 
  agTopupPackagesJSON, 
  getPackagesByCategory,
  getDiamondPackages,
  getSubscriptionPackages,
  getComboPackages,
  getPackageById,
  validatePricing,
  validateComboPricing
} from "@shared/topup-packages";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the Free Fire top-up application
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AG TOPUP Packages API Endpoints
  
  // Get all packages
  app.get("/api/packages", (req, res) => {
    res.json({
      success: true,
      data: agTopupPackages,
      total: agTopupPackages.length
    });
  });

  // Get packages by category
  app.get("/api/packages/category/:categoryId", (req, res) => {
    const { categoryId } = req.params;
    const packages = getPackagesByCategory(categoryId);
    
    res.json({
      success: true,
      data: packages,
      category: categoryId,
      total: packages.length
    });
  });

  // Get diamond packages only
  app.get("/api/packages/diamonds", (req, res) => {
    const packages = getDiamondPackages();
    
    res.json({
      success: true,
      data: packages,
      total: packages.length
    });
  });

  // Get subscription packages only
  app.get("/api/packages/subscriptions", (req, res) => {
    const packages = getSubscriptionPackages();
    
    res.json({
      success: true,
      data: packages,
      total: packages.length
    });
  });

  // Get combo packages only
  app.get("/api/packages/combos", (req, res) => {
    const packages = getComboPackages();
    
    res.json({
      success: true,
      data: packages,
      total: packages.length
    });
  });

  // AG TOPUP JSON format endpoint (for external integrations)
  app.get("/api/packages/json", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(agTopupPackagesJSON);
  });

  // Get package by ID (moved after specific routes to avoid conflicts)
  app.get("/api/packages/:packageId", (req, res) => {
    const { packageId } = req.params;
    const package_data = getPackageById(packageId);
    
    if (!package_data) {
      return res.status(404).json({
        success: false,
        error: "Package not found"
      });
    }

    res.json({
      success: true,
      data: package_data
    });
  });

  // Validate package pricing
  app.post("/api/packages/validate", (req, res) => {
    const { packageId, expectedPrice } = req.body;
    
    if (!packageId || typeof expectedPrice !== "number") {
      return res.status(400).json({
        success: false,
        error: "Package ID and expected price are required"
      });
    }

    const isValid = validatePricing(packageId, expectedPrice);
    const package_data = getPackageById(packageId);
    
    res.json({
      success: true,
      valid: isValid,
      package: package_data,
      expectedPrice,
      actualPrice: package_data?.price
    });
  });

  // Validate combo package pricing with discount information
  app.post("/api/packages/validate-combo", (req, res) => {
    const { packageId, expectedPrice } = req.body;
    
    if (!packageId || typeof expectedPrice !== "number") {
      return res.status(400).json({
        success: false,
        error: "Package ID and expected price are required"
      });
    }

    const validation = validateComboPricing(packageId, expectedPrice);
    const package_data = getPackageById(packageId);
    
    res.json({
      success: true,
      ...validation,
      package: package_data,
      expectedPrice
    });
  });

  // Order processing endpoint (placeholder for payment integration)
  app.post("/api/orders", (req, res) => {
    const { packageId, playerId, transactionId, paymentMethod } = req.body;
    
    // Validate required fields
    if (!packageId || !playerId || !transactionId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: packageId, playerId, transactionId, paymentMethod"
      });
    }

    // Get package details
    const package_data = getPackageById(packageId);
    if (!package_data) {
      return res.status(404).json({
        success: false,
        error: "Package not found"
      });
    }

    // In a real implementation, this would:
    // 1. Verify payment with bKash/Nagad/Rocket API
    // 2. Process the Free Fire diamond top-up
    // 3. Store order in database
    // 4. Send confirmation to user

    // For now, return a mock successful response
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      success: true,
      orderId,
      package: package_data,
      playerId,
      transactionId,
      paymentMethod,
      status: "completed",
      message: "Order processed successfully. Diamonds will be delivered within 1-5 minutes."
    });
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
