export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">About BudgetTracker</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-6">
            BudgetTracker is your comprehensive solution for managing personal finances and achieving financial goals.
          </p>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-muted-foreground">
                To empower individuals with the tools and insights they need to take control of their financial future. 
                We believe that financial literacy and proper budgeting are the foundation of financial success.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Track income and expenses in real-time</li>
                <li>Set and monitor budget goals</li>
                <li>Generate detailed financial reports</li>
                <li>Secure and private data handling</li>
                <li>Mobile-responsive design</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">Why Choose BudgetTracker?</h2>
              <p className="text-muted-foreground">
                Built with modern technology and user experience in mind, BudgetTracker provides an intuitive 
                interface that makes financial management simple and effective. Whether you&apos;re just starting 
                your financial journey or looking to optimize your existing budget, we&apos;re here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}