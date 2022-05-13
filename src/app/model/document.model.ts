export interface IDocument
{
    estado:boolean,
    message:String
    data:
    {
        id:number,
        DocName: String,
        DocType: String,
        DownloadCount: number,
        ViewCount: number,
        LatestModDate: Date,
        DocPath: String
    }
}