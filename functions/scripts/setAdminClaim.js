"use strict";

/**
 * CLI Administrative Utility: Assign or Revoke Admin Custom Claim.
 * Usage:
 *   node scripts/setAdminClaim.js <email-or-uid> [--revoke]
 *
 * Example:
 *   node scripts/setAdminClaim.js admin@nextgen.edu
 *   node scripts/setAdminClaim.js user123 --revoke
 */

const {setAdminClaim} = require("../src/modules/admin/claimsManager");

/**
 * Main CLI execution entry point.
 */
async function main() {
  const args = process.argv.slice(2);
  const identifier = args[0];
  const isRevoke = args.includes("--revoke");

  if (!identifier) {
    console.error(
        "Usage: node scripts/setAdminClaim.js <email-or-uid> [--revoke]",
    );
    process.exit(1);
  }

  console.log(`Setting admin=${!isRevoke} for: ${identifier}...`);
  try {
    const result = await setAdminClaim(identifier, !isRevoke);
    console.log("Success! Updated claims:", result);
    process.exit(0);
  } catch (err) {
    console.error("Failed to set admin claim:", err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
