import mongoose, { Schema, model, models } from 'mongoose';

type JobType = 'EOI' | 'FIRST_YEAR' | 'INTERN' | 'GRADUATE';
type StudyField = 'SOFTWARE' | 'CYBERSECURITY' | 'DATA_SCIENCE';
type LocationType = 'VIC' | 'NSW' | 'QLD' | 'WA' | 'NT' | 'SA' | 'HYBRID' | 'REMOTE' | 'AUSTRALIA';
type WorkingRight = 'AUS_CITIZEN' | 'AUS_PR' | 'NZ_CITIZEN' | 'NZ_PR' | 'INTERNATIONAL';

const CompanySchema = new Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
});

const ListingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: CompanySchema, required: true },
    application_url: { type: String, required: true },
    source_urls: { type: [String], required: true },
    type: { type: String, enum: ['EOI', 'FIRST_YEAR', 'INTERN', 'GRADUATE'], required: true },
    close_date: { type: Date, required: false },
    locations: { type: [String], enum: ['VIC', 'NSW', 'QLD', 'WA', 'NT', 'SA', 'HYBRID', 'REMOTE', 'AUSTRALIA'], required: true },
    study_fields: { type: [String], enum: ['SOFTWARE', 'CYBERSECURITY', 'DATA_SCIENCE'], required: true },
    start_date: { type: Date, required: true },
    working_rights: { type: [String], enum: ['AUS_CITIZEN', 'AUS_PR', 'NZ_CITIZEN', 'NZ_PR', 'INTERNATIONAL'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Listing = models.Listing || model('Listing', ListingSchema);

export default Listing;