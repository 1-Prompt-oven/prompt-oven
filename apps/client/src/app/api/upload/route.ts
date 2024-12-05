import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
	PutObjectCommand,
	GetObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
	},
})

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('img') as File | null
		const keyword = formData.get('keyword') as string | null

		if (!file || !keyword) {
			return NextResponse.json(
				{ error: 'File and keyword are required' },
				{ status: 400 }
			)
		}

		// Generate a unique key for the file
		const timestamp = Date.now()
		const uniqueKey = `${keyword}/${timestamp}-${file.name}`

		const buffer = Buffer.from(await file.arrayBuffer())

		// Upload the file
		await s3.send(
			new PutObjectCommand({
				Bucket: process.env.BUCKET,
				Key: uniqueKey,
				Body: buffer,
				ContentType: file.type || 'image/png',
			})
		)

		// Generate a signed URL for the uploaded object
		const signedUrl = await getSignedUrl(
			s3,
			new GetObjectCommand({
				Bucket: process.env.BUCKET,
				Key: uniqueKey,
			}),
			{ expiresIn: 3600 } // URL expires in 1 hour
		)

		// Return both the signed URL and the direct S3 URL
		const directUrl = `https://${process.env.BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`
		return NextResponse.json({ 
			url: directUrl,
			signedUrl
		})
	} catch (error) {
		return NextResponse.json(
			{ error: String(error) },
			{ status: 500 }
		)
	}
}
