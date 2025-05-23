/*
  # Update stake validation for flexible amounts

  1. Changes
    - Updates stake amount validation to only enforce minimum amounts:
      - Core Vault: Minimum 0.05 ETH
      - Growth Nexus: Minimum 2 ETH
      - Elite Matrix: Minimum 10 ETH
      - Legacy Protocol: Minimum 20 ETH
    - Removes upper limits to allow flexible staking amounts

  2. Security
    - Maintains existing RLS policies
    - No changes to table structure or permissions
*/

-- Drop existing trigger first
DROP TRIGGER IF EXISTS validate_stake_trigger ON stakes;

-- Create updated validation function
CREATE OR REPLACE FUNCTION validate_stake()
RETURNS trigger AS $$
BEGIN
  -- Validate plan yields and minimum amounts
  CASE NEW.plan
    WHEN 'Core Vault' THEN
      IF NEW.amount < 0.05 OR NEW.daily_yield != 1.5 THEN
        RAISE EXCEPTION 'Core Vault plan requires minimum 0.05 ETH';
      END IF;
    WHEN 'Growth Nexus' THEN
      IF NEW.amount < 2 OR NEW.daily_yield != 2.5 THEN
        RAISE EXCEPTION 'Growth Nexus plan requires minimum 2 ETH';
      END IF;
    WHEN 'Elite Matrix' THEN
      IF NEW.amount < 10 OR NEW.daily_yield != 3.5 THEN
        RAISE EXCEPTION 'Elite Matrix plan requires minimum 10 ETH';
      END IF;
    WHEN 'Legacy Protocol' THEN
      IF NEW.amount < 20 OR NEW.daily_yield != 5 THEN
        RAISE EXCEPTION 'Legacy Protocol plan requires minimum 20 ETH';
      END IF;
    ELSE
      RAISE EXCEPTION 'Invalid staking plan';
  END CASE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger with updated validation
CREATE TRIGGER validate_stake_trigger
  BEFORE INSERT OR UPDATE ON stakes
  FOR EACH ROW
  EXECUTE FUNCTION validate_stake();