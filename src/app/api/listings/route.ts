import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import Listing from '../../../models/Listing';

export async function GET(req: NextRequest) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const location = searchParams.get('location');
        const studyField = searchParams.get('studyField');
        const sortField = searchParams.get('sortField') || 'title';
        const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

        let query: any = {};
        if (type) query.type = type;
        if (location) query.locations = location;
        if (studyField) query.study_fields = studyField;

        const listings = await Listing.find(query).sort({ [sortField]: sortOrder });
        return NextResponse.json(listings);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
