import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uploadDir = path.join(process.cwd(), '/public/uploads');

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }

    // Access companyCode from fields
    const companyCode = fields.companyCode as unknown as string;
    const uploadedFile = files?.file?.[0]; // Adjust based on actual structure

    // Rename the file based on company code
    const extension = path.extname(uploadedFile?.originalFilename! || uploadedFile?.newFilename!);
    const newFilename = `${companyCode}${extension}`;
    const newFilePath = path.join(uploadDir, newFilename);

    // Move file to the new filename
    fs.renameSync(uploadedFile?.filepath!, newFilePath);

    res.status(200).json({ filename: newFilename });
  });
};

export default handler;
